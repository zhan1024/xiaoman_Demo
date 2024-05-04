
export interface Component {
    render(): Vnode
    data(): object
    beforeCreated?(): void
    created?(): void
    beforeMount?(): void
    mounted?(): void
    beforeUpdate?(): void
    updated?(): void
}
interface Instance {
    uid: number
    subTree?: Vnode | null
    isMounted?: boolean
    state: object
}
/**
 * 虚拟dom
 * 为什么要有虚拟dom？
 * 因为interface 在编译之后会被删掉的 而class不会
 */
export class Vnode {
    tag: string | Component //标签div p | 组件
    el?: HTMLElement //真实的dom
    key?: string | number
    children?: Vnode[] | string
    props?: Record<any, any>
    component?: Instance
}