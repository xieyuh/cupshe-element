import { Ref, watch, onBeforeUnmount, onDeactivated } from 'vue';
import { getScrollParent, onMountedOrActivated, useTouch } from '.';
import { preventDefault } from '../utils';

const BODY_LOCK_CLASS = 'c-overflow-hidden';
const BODY_LOCK_ATTRIBUTE = 'data-lock-count';

export function useLockScroll(
  rootRef: Ref<HTMLElement | undefined>,
  shouldLock: () => boolean
) {
  const touch = useTouch();

  const getLockCount = () => {
    const lockCount = Number(document.body.getAttribute(BODY_LOCK_ATTRIBUTE));

    return Number.isNaN(lockCount) ? 0 : lockCount;
  };

  const setLockCount = (count: number) => {
    document.body.setAttribute(BODY_LOCK_ATTRIBUTE, String(count));
  };

  const onTouchMove = (event: TouchEvent) => {
    touch.move(event);

    const direction = touch.deltaY.value > 0 ? '10' : '01';
    const el = getScrollParent(
      event.target as Element,
      rootRef.value
    ) as HTMLElement;
    const { scrollHeight, offsetHeight, scrollTop } = el;
    let status = '11';

    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? '00' : '01';
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = '10';
    }

    if (
      status !== '11' &&
      touch.isVertical() &&
      !(parseInt(status, 2) & parseInt(direction, 2))
    ) {
      preventDefault(event, true);
    }
  };

  const lock = () => {
    document.addEventListener('touchstart', touch.start);
    document.addEventListener('touchmove', onTouchMove, { passive: false });

    const lockCount = getLockCount();

    if (!lockCount) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }

    setLockCount(lockCount + 1);
  };

  const unlock = () => {
    let lockCount = getLockCount();

    if (lockCount) {
      document.removeEventListener('touchstart', touch.start);
      document.removeEventListener('touchmove', onTouchMove);

      lockCount--;

      setLockCount(lockCount);

      if (!lockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };

  const init = () => shouldLock() && lock();

  const destroy = () => shouldLock() && unlock();

  onMountedOrActivated(init);
  onDeactivated(destroy);
  onBeforeUnmount(destroy);

  watch(shouldLock, (value) => {
    value ? lock() : unlock();
  });
}
