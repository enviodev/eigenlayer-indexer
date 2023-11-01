/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  StrategyManagerContract_Deposit_loader,
  StrategyManagerContract_Deposit_handler,
  StrategyManagerContract_Initialized_loader,
  StrategyManagerContract_Initialized_handler,
  StrategyManagerContract_OwnershipTransferred_loader,
  StrategyManagerContract_OwnershipTransferred_handler,
  StrategyManagerContract_Paused_loader,
  StrategyManagerContract_Paused_handler,
  StrategyManagerContract_PauserRegistrySet_loader,
  StrategyManagerContract_PauserRegistrySet_handler,
  StrategyManagerContract_ShareWithdrawalQueued_loader,
  StrategyManagerContract_ShareWithdrawalQueued_handler,
  StrategyManagerContract_StrategyAddedToDepositWhitelist_loader,
  StrategyManagerContract_StrategyAddedToDepositWhitelist_handler,
  StrategyManagerContract_StrategyRemovedFromDepositWhitelist_loader,
  StrategyManagerContract_StrategyRemovedFromDepositWhitelist_handler,
  StrategyManagerContract_StrategyWhitelisterChanged_loader,
  StrategyManagerContract_StrategyWhitelisterChanged_handler,
  StrategyManagerContract_Unpaused_loader,
  StrategyManagerContract_Unpaused_handler,
  StrategyManagerContract_WithdrawalCompleted_loader,
  StrategyManagerContract_WithdrawalCompleted_handler,
  StrategyManagerContract_WithdrawalDelayBlocksSet_loader,
  StrategyManagerContract_WithdrawalDelayBlocksSet_handler,
  StrategyManagerContract_WithdrawalQueued_loader,
  StrategyManagerContract_WithdrawalQueued_handler,
} from "../generated/src/Handlers.gen";

import {
  DepositEntity,
  InitializedEntity,
  OwnershipTransferredEntity,
  PausedEntity,
  PauserRegistrySetEntity,
  ShareWithdrawalQueuedEntity,
  StrategyAddedToDepositWhitelistEntity,
  StrategyRemovedFromDepositWhitelistEntity,
  StrategyWhitelisterChangedEntity,
  UnpausedEntity,
  WithdrawalCompletedEntity,
  WithdrawalDelayBlocksSetEntity,
  WithdrawalQueuedEntity,
  EventsSummaryEntity
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  depositsCount: BigInt(0),
  initializedsCount: BigInt(0),
  ownershipTransferredsCount: BigInt(0),
  pausedsCount: BigInt(0),
  pauserRegistrySetsCount: BigInt(0),
  shareWithdrawalQueuedsCount: BigInt(0),
  strategyAddedToDepositWhitelistsCount: BigInt(0),
  strategyRemovedFromDepositWhitelistsCount: BigInt(0),
  strategyWhitelisterChangedsCount: BigInt(0),
  unpausedsCount: BigInt(0),
  withdrawalCompletedsCount: BigInt(0),
  withdrawalDelayBlocksSetsCount: BigInt(0),
  withdrawalQueuedsCount: BigInt(0),
};

StrategyManagerContract_Deposit_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_Deposit_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    depositsCount: currentSummaryEntity.depositsCount + BigInt(1),
  };

  let depositEntity: DepositEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    depositor: event.params.depositor,
    token: event.params.token,
    strategy: event.params.strategy,
    shares: event.params.shares,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Deposit.set(depositEntity);
});

StrategyManagerContract_Initialized_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_Initialized_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    initializedsCount: currentSummaryEntity.initializedsCount + BigInt(1),
  };

  let initializedEntity: InitializedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    version: event.params.version,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Initialized.set(initializedEntity);
});

StrategyManagerContract_OwnershipTransferred_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_OwnershipTransferred_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    ownershipTransferredsCount: currentSummaryEntity.ownershipTransferredsCount + BigInt(1),
  };

  let ownershipTransferredEntity: OwnershipTransferredEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.OwnershipTransferred.set(ownershipTransferredEntity);
});

StrategyManagerContract_Paused_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_Paused_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    pausedsCount: currentSummaryEntity.pausedsCount + BigInt(1),
  };

  let pausedEntity: PausedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    account: event.params.account,
    newPausedStatus: event.params.newPausedStatus,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Paused.set(pausedEntity);
});

StrategyManagerContract_PauserRegistrySet_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_PauserRegistrySet_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    pauserRegistrySetsCount: currentSummaryEntity.pauserRegistrySetsCount + BigInt(1),
  };

  let pauserRegistrySetEntity: PauserRegistrySetEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    pauserRegistry: event.params.pauserRegistry,
    newPauserRegistry: event.params.newPauserRegistry,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.PauserRegistrySet.set(pauserRegistrySetEntity);
});

StrategyManagerContract_ShareWithdrawalQueued_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_ShareWithdrawalQueued_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    shareWithdrawalQueuedsCount: currentSummaryEntity.shareWithdrawalQueuedsCount + BigInt(1),
  };

  let shareWithdrawalQueuedEntity: ShareWithdrawalQueuedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    depositor: event.params.depositor,
    nonce: event.params.nonce,
    strategy: event.params.strategy,
    shares: event.params.shares,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ShareWithdrawalQueued.set(shareWithdrawalQueuedEntity);
});

StrategyManagerContract_StrategyAddedToDepositWhitelist_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_StrategyAddedToDepositWhitelist_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    strategyAddedToDepositWhitelistsCount: currentSummaryEntity.strategyAddedToDepositWhitelistsCount + BigInt(1),
  };

  let strategyAddedToDepositWhitelistEntity: StrategyAddedToDepositWhitelistEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    strategy: event.params.strategy,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.StrategyAddedToDepositWhitelist.set(strategyAddedToDepositWhitelistEntity);
});

StrategyManagerContract_StrategyRemovedFromDepositWhitelist_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_StrategyRemovedFromDepositWhitelist_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    strategyRemovedFromDepositWhitelistsCount: currentSummaryEntity.strategyRemovedFromDepositWhitelistsCount + BigInt(1),
  };

  let strategyRemovedFromDepositWhitelistEntity: StrategyRemovedFromDepositWhitelistEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    strategy: event.params.strategy,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.StrategyRemovedFromDepositWhitelist.set(strategyRemovedFromDepositWhitelistEntity);
});

StrategyManagerContract_StrategyWhitelisterChanged_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_StrategyWhitelisterChanged_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    strategyWhitelisterChangedsCount: currentSummaryEntity.strategyWhitelisterChangedsCount + BigInt(1),
  };

  let strategyWhitelisterChangedEntity: StrategyWhitelisterChangedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    previousAddress: event.params.previousAddress,
    newAddress: event.params.newAddress,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.StrategyWhitelisterChanged.set(strategyWhitelisterChangedEntity);
});

StrategyManagerContract_Unpaused_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_Unpaused_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    unpausedsCount: currentSummaryEntity.unpausedsCount + BigInt(1),
  };

  let unpausedEntity: UnpausedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    account: event.params.account,
    newPausedStatus: event.params.newPausedStatus,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Unpaused.set(unpausedEntity);
});

StrategyManagerContract_WithdrawalCompleted_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_WithdrawalCompleted_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    withdrawalCompletedsCount: currentSummaryEntity.withdrawalCompletedsCount + BigInt(1),
  };

  let withdrawalCompletedEntity: WithdrawalCompletedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    depositor: event.params.depositor,
    nonce: event.params.nonce,
    withdrawer: event.params.withdrawer,
    withdrawalRoot: event.params.withdrawalRoot,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.WithdrawalCompleted.set(withdrawalCompletedEntity);
});

StrategyManagerContract_WithdrawalDelayBlocksSet_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_WithdrawalDelayBlocksSet_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    withdrawalDelayBlocksSetsCount: currentSummaryEntity.withdrawalDelayBlocksSetsCount + BigInt(1),
  };

  let withdrawalDelayBlocksSetEntity: WithdrawalDelayBlocksSetEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    previousValue: event.params.previousValue,
    newValue: event.params.newValue,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.WithdrawalDelayBlocksSet.set(withdrawalDelayBlocksSetEntity);
});

StrategyManagerContract_WithdrawalQueued_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StrategyManagerContract_WithdrawalQueued_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    withdrawalQueuedsCount: currentSummaryEntity.withdrawalQueuedsCount + BigInt(1),
  };

  let withdrawalQueuedEntity: WithdrawalQueuedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    depositor: event.params.depositor,
    nonce: event.params.nonce,
    withdrawer: event.params.withdrawer,
    delegatedAddress: event.params.delegatedAddress,
    withdrawalRoot: event.params.withdrawalRoot,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.WithdrawalQueued.set(withdrawalQueuedEntity);
});

