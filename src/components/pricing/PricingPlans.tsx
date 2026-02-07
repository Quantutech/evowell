import React from 'react';
import { PRICING_TIERS } from '../../config/pricing';
import { SubscriptionTier } from '../../types';
import { PlanCard } from './PlanCard';

interface PricingPlansProps {
  currentTier?: SubscriptionTier;
  billingCycle?: 'monthly' | 'annual';
  onSelect?: (tier: SubscriptionTier) => void;
  loadingTier?: SubscriptionTier | null;
  publicMode?: boolean; 
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ 
  currentTier, 
  billingCycle = 'monthly', 
  onSelect, 
  loadingTier,
  publicMode = false
}) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {PRICING_TIERS.map(pkg => (
        <PlanCard 
          key={pkg.id}
          pkg={pkg}
          currentTier={currentTier}
          billingCycle={billingCycle}
          onSelect={onSelect}
          loadingTier={loadingTier}
          publicMode={publicMode}
        />
      ))}
    </div>
  );
};
