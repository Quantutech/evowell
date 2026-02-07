import React, { useState } from 'react';
import { Resource, ResourceType, ResourceAccess, ResourceVisibility } from '@/types';
import { useForm, Controller } from 'react-hook-form';
import { api } from '@/services/api';
import { Select } from '@/components/ui/Select';

interface ResourceEditorProps {
  initialData?: Partial<Resource>;
  onSave: (data: Partial<Resource>) => Promise<void>;
  onCancel: () => void;
}

const RESOURCE_TYPES = [
  { value: 'course', label: 'Course' },
  { value: 'template', label: 'Template' },
  { value: 'worksheet', label: 'Worksheet' },
  { value: 'mood_board', label: 'Mood Board' },
  { value: 'toolkit', label: 'Toolkit' },
  { value: 'guide', label: 'Guide' },
  { value: 'assessment', label: 'Assessment' },
  { value: 'audio', label: 'Audio' }
];

const LANGUAGES = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'Mandarin', label: 'Mandarin' }
];

const DELIVERY_TYPES = [
  { value: 'download', label: 'File Download' },
  { value: 'external_link', label: 'External Link' },
  { value: 'embedded', label: 'Embedded Content' }
];

const ResourceEditor: React.FC<ResourceEditorProps> = ({ initialData, onSave, onCancel }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, watch, control, setValue, formState: { errors } } = useForm<Partial<Resource>>({
    defaultValues: {
      title: '',
      shortDescription: '',
      fullDescription: '',
      type: 'worksheet',
      categories: [],
      languages: ['English'],
      accessType: 'free',
      currency: 'USD',
      deliveryType: 'download',
      visibility: 'public',
      status: 'draft',
      ...initialData
    }
  });

  const formValues = watch();

  const onSubmit = async (data: Partial<Resource>) => {
    setIsSubmitting(true);
    try {
      await onSave({
        ...data,
        updatedAt: new Date().toISOString(),
        ...(!initialData?.id ? {
            createdAt: new Date().toISOString(),
            downloads: 0,
            views: 0,
            moderationStatus: 'pending'
        } : {})
      });
    } catch (error) {
      console.error(error);
      alert("Failed to save resource.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden max-w-4xl mx-auto">
      <div className="bg-slate-50 border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <div className="flex gap-2">
            {[1, 2, 3].map(i => (
                <div key={i} className={`h-2 w-12 rounded-full transition-colors ${step >= i ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
            ))}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Step {step} of 3</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-10">
        {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
                <div className="space-y-4">
                    <label className="block text-sm font-black text-slate-900 uppercase tracking-widest">Resource Title</label>
                    <input {...register('title', { required: true })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-brand-500/10 outline-none" placeholder="e.g. 5-Minute Anxiety Reset" />
                    {errors.title && <span className="text-red-500 text-xs font-bold">Title is required</span>}
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <Select 
                                label="Type" 
                                value={field.value} 
                                onChange={field.onChange} 
                                options={RESOURCE_TYPES} 
                            />
                        )}
                    />
                    <Controller
                        name="languages.0"
                        control={control}
                        render={({ field }) => (
                            <Select 
                                label="Language" 
                                value={field.value} 
                                onChange={field.onChange} 
                                options={LANGUAGES} 
                            />
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Short Description (160 chars)</label>
                    <textarea {...register('shortDescription', { required: true, maxLength: 160 })} className="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 font-medium text-slate-700 resize-none outline-none focus:ring-2 focus:ring-brand-500/10" placeholder="Briefly describe the value of this resource..." />
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
                <div className="space-y-4">
                    <label className="block text-sm font-black text-slate-900 uppercase tracking-widest">Full Description (Markdown)</label>
                    <textarea {...register('fullDescription')} className="w-full h-64 bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 font-mono text-sm text-slate-700 resize-none outline-none focus:ring-2 focus:ring-brand-500/10" placeholder="# Introduction..." />
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
                    <div className="flex items-center gap-8">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="radio" value="free" {...register('accessType')} className="w-5 h-5 text-slate-900 focus:ring-slate-900" />
                            <span className="font-bold text-slate-700">Free Access</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="radio" value="paid" {...register('accessType')} className="w-5 h-5 text-slate-900 focus:ring-slate-900" />
                            <span className="font-bold text-slate-700">Paid Resource</span>
                        </label>
                    </div>

                    {formValues.accessType === 'paid' && (
                        <div className="animate-in slide-in-from-top-2">
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Price (Cents)</label>
                            <input type="number" {...register('price', { valueAsNumber: true })} className="w-full bg-white border border-slate-200 rounded-xl px-6 py-3 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-brand-500/10" placeholder="e.g. 1900 for $19.00" />
                        </div>
                    )}
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
                <Controller
                    name="deliveryType"
                    control={control}
                    render={({ field }) => (
                        <Select 
                            label="Delivery Method" 
                            value={field.value} 
                            onChange={field.onChange} 
                            options={DELIVERY_TYPES} 
                        />
                    )}
                />

                {formValues.deliveryType === 'download' ? (
                    <div className="space-y-4">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">File URL</label>
                        <input {...register('fileUrl')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-brand-500/10" placeholder="https://..." />
                        <p className="text-[10px] text-slate-400 font-bold uppercase px-1">Note: File upload will be implemented with real storage later. Paste a link for now.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">External / Embed URL</label>
                        <input {...register('externalUrl')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-brand-500/10" placeholder="https://..." />
                    </div>
                )}

                <div className="space-y-4">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Thumbnail URL</label>
                    <input {...register('thumbnailUrl')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-brand-500/10" placeholder="https://images.unsplash.com/..." />
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" checked={formValues.visibility === 'public'} onChange={(e) => setValue('visibility', e.target.checked ? 'public' : 'providers_only')} className="w-5 h-5 rounded-lg border-slate-300 text-brand-600 focus:ring-brand-500" />
                        <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Make Publicly Visible</span>
                    </label>
                </div>
            </div>
        )}

        <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-100">
            {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-6 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-900">Back</button>
            ) : (
                <button type="button" onClick={onCancel} className="px-6 py-3 text-red-500 font-bold text-xs uppercase tracking-widest hover:text-red-700">Cancel</button>
            )}

            {step < 3 ? (
                <button type="button" onClick={nextStep} className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">Next Step</button>
            ) : (
                <button type="submit" disabled={isSubmitting} className="px-10 py-4 bg-brand-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-700 transition-all shadow-xl disabled:opacity-50">
                    {isSubmitting ? 'Saving...' : 'Publish Resource'}
                </button>
            )}
        </div>
      </form>
    </div>
  );
};

export default ResourceEditor;
