'use client'

import React, { useState } from 'react';
import { ModuleKey, hasModuleAccess, getUpgradeTarget, PlanTier } from '@/config/permissions';
import { UpgradeVipModal } from '@/components/UpgradeVipModal';

interface ModuleSwitchProps {
  moduleKey: ModuleKey;
  userPlan: PlanTier;
  isActive: boolean;
  onToggle: (newState: boolean) => void;
}

export const ModuleSwitch: React.FC<ModuleSwitchProps> = ({
  moduleKey,
  userPlan,
  isActive,
  onToggle
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isAllowed = hasModuleAccess(userPlan, moduleKey);
  const upgradeData = getUpgradeTarget(userPlan, moduleKey);

  const handleClick = () => {
    if (!isAllowed) {
      // Bloqueia a ativação e abre o modal de upgrade
      setModalOpen(true);
      return;
    }
    onToggle(!isActive);
  };

  return (
    <>
      <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-100">{upgradeData.moduleName}</span>
          {!isAllowed && (
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#E2B857]/10 text-[#E2B857] border border-[#E2B857]/30 flex items-center gap-1">
              🔒 {upgradeData.targetPlan.toUpperCase()}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleClick}
          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
            isActive && isAllowed ? 'bg-[#22C55E]' : 'bg-zinc-700'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              isActive && isAllowed ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Modal de Upgrade acionado automaticamente */}
      {modalOpen && (
        <UpgradeVipModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          data={upgradeData}
        />
      )}
    </>
  );
};

export default ModuleSwitch;

