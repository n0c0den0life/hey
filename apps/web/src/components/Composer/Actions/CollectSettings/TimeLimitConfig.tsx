import type { CollectModuleType } from '@hey/types/hey';

import ToggleWithHelper from '@components/Shared/ToggleWithHelper';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Input } from '@hey/ui';
import { getNumberOfDaysFromDate, getTimeAddedNDay } from '@lib/formatTime';
import { type FC } from 'react';
import { useCollectModuleStore } from 'src/store/non-persisted/useCollectModuleStore';

interface TimeLimitConfigProps {
  setCollectType: (data: CollectModuleType) => void;
}

const TimeLimitConfig: FC<TimeLimitConfigProps> = ({ setCollectType }) => {
  const collectModule = useCollectModuleStore((state) => state.collectModule);

  return (
    <div className="pt-5">
      <ToggleWithHelper
        description="Limit collecting to specific period of time"
        heading="Time limit"
        icon={<ClockIcon className="h-4 w-4" />}
        on={Boolean(collectModule.endsAt)}
        setOn={() =>
          setCollectType({
            endsAt: Boolean(collectModule.endsAt) ? null : getTimeAddedNDay(1)
          })
        }
      />
      {collectModule.endsAt ? (
        <div className="pt-4 text-sm">
          <Input
            label="Number of days"
            max="100"
            min="1"
            onChange={(event) => {
              setCollectType({
                endsAt: getTimeAddedNDay(Number(event.target.value))
              });
            }}
            placeholder="5"
            type="number"
            value={getNumberOfDaysFromDate(new Date(collectModule.endsAt))}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TimeLimitConfig;
