import { navigationRef } from './navigation-ref';
import type { SharedStackParamList } from './shared-stack-navigator';

export function goToShared<
  T extends keyof SharedStackParamList
>(
  screen: T,
  params?: SharedStackParamList[T]
) {
  if (!navigationRef.isReady()) return;

  navigationRef.navigate('Shared', {
    screen,
    params,
  } as any);
}
