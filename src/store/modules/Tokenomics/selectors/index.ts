// SPDX-License-Identifier: ice License 1.0

import {TotalCoinsTimeSeries} from '@api/tokenomics/types';
import {dayjs} from '@services/dayjs';
import {StatsPeriod} from '@store/modules/Stats/types';
import {MiningState} from '@store/modules/Tokenomics/types';
import {RootState} from '@store/rootReducer';

export const miningStateSelector = (state: RootState): MiningState => {
  if (typeof state.tokenomics.miningSummary?.kycStepBlocked === 'number') {
    return 'disabled';
  }

  if (!state.tokenomics.miningSummary?.miningSession) {
    return 'inactive';
  }

  const miningSession = state.tokenomics.miningSummary.miningSession;

  if (dayjs().isAfter(miningSession.warnAboutExpirationStartingAt)) {
    return miningSession.free ? 'holidayExpire' : 'expire';
  }

  if (dayjs().isAfter(miningSession.resettableStartingAt)) {
    return miningSession.free ? 'holidayRestart' : 'restart';
  }

  return miningSession.free ? 'holidayActive' : 'active';
};

export const isMiningActiveSelector = (state: RootState) => {
  return !!state.tokenomics.miningSummary?.miningSession;
};

export const miningSessionSelector = (state: RootState) => {
  return state.tokenomics.miningSummary?.miningSession;
};

export const balanceSummarySelector = (state: RootState) => {
  return state.tokenomics.balanceSummary;
};

export const miningRatesSelector = (state: RootState) => {
  return state.tokenomics.miningSummary?.miningRates;
};

export const miningSummarySelector = (state: RootState) => {
  return state.tokenomics.miningSummary;
};

export const miningStartedSelector = (state: RootState) => {
  return state.tokenomics.miningSummary?.miningStarted;
};

export const preStakingSummarySelector = (state: RootState) => {
  return state.tokenomics.preStakingSummary;
};

export const isPreStakingActiveSelector = (state: RootState) => {
  return !!state.tokenomics.preStakingSummary;
};

export const rankingSummarySelector =
  (userId: string) => (state: RootState) => {
    return state.tokenomics.rankingSummary[userId];
  };

export const globalRankSelector = (userId: string) => (state: RootState) => {
  return state.tokenomics.rankingSummary[userId]?.globalRank;
};

export const balanceHistorySelector = (state: RootState) => {
  return state.tokenomics.balanceHistory;
};

export const tapToMineActionTypeSelector = (state: RootState) => {
  return state.tokenomics.tapToMineActionType;
};

export const getTotalCoinsStatsSelector =
  (period: StatsPeriod) =>
  (state: RootState): TotalCoinsTimeSeries[] => {
    return state.tokenomics.totalCoins.timeSeriesStatsMap[period] ?? [];
  };

export const totalCoinsSelector = (state: RootState) => {
  return state.tokenomics.totalCoins.total;
};

export const kycStepBlockedSelector = (state: RootState) => {
  return state.tokenomics.miningSummary?.kycStepBlocked;
};
