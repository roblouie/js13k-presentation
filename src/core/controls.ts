import { EnhancedDOMPoint } from '@/engine/enhanced-dom-point';

export class Controls {
  isConfirm? = false;
  inputDirection: EnhancedDOMPoint;
  private mouseMovement = new EnhancedDOMPoint();
  private onMouseMoveCallback?: (mouseMovement: EnhancedDOMPoint) => void;

  keyMap: Map<string, boolean> = new Map();

  constructor(targetElement: HTMLElement) {
    targetElement.addEventListener('keydown', event => this.toggleKey(event, true));
    targetElement.addEventListener('keyup', event => this.toggleKey(event, false));
    // document.addEventListener('mousedown', () => this.toggleKey({ code: 'KeyE' }, true));
    // document.addEventListener('mouseup', () => this.toggleKey({ code: 'KeyE' }, false));
    targetElement.addEventListener('mousemove', event => {
      this.mouseMovement.x = event.movementX;
      this.mouseMovement.y = event.movementY;
      this.onMouseMoveCallback?.(this.mouseMovement);
    });
    this.inputDirection = new EnhancedDOMPoint();
  }

  onMouseMove(callback: (mouseMovement: EnhancedDOMPoint) => void) {
    this.onMouseMoveCallback = callback;
  }

  queryController() {
    const leftVal = (this.keyMap.get('KeyA') || this.keyMap.get('ArrowLeft')) ? -1 : 0;
    const rightVal = (this.keyMap.get('KeyD') || this.keyMap.get('ArrowRight')) ? 1 : 0;
    const upVal = (this.keyMap.get('KeyW') || this.keyMap.get('ArrowUp')) ? -1 : 0;
    const downVal = (this.keyMap.get('KeyS') || this.keyMap.get('ArrowDown')) ? 1 : 0;
    const vertStrafeUp = (this.keyMap.get('KeyQ') || this.keyMap.get('KeyQ')) ? -1 : 0;
    const vertStrafeDown = (this.keyMap.get('KeyE') || this.keyMap.get('KeyE')) ? 1 : 0;

    this.inputDirection.x = (leftVal + rightVal);
    this.inputDirection.y = (upVal + downVal);
    this.inputDirection.z = (vertStrafeUp + vertStrafeDown);
    this.isConfirm = this.keyMap.get('KeyR');
  }

  private toggleKey(event: { code: string }, isPressed: boolean) {
    this.keyMap.set(event.code, isPressed);
  }
}

// export const controls = new Controls();
