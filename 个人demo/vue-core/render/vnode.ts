export interface Component {
  render(): Vnode
  data(): object
  beforeCreated?(): void
  created(): void
  beforeMount?(): void
  beforeUpdate?(): void
  updated?(): void
}
interface Instance {
  uid: number
  subTree?: Vnode | null
  isMounted?: boolean
  state: object
}
export class Vnode {
  tag: string | Component
  el?: HTMLElement
  key?: string | number
  children?: Vnode[] | string
  props?: Record<any, any>
  component?: Instance
}
