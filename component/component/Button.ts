import type { Vnode, Component } from "../renderer/vnode"
import { h } from "../renderer/h"
import { nextTick } from "../renderer/queue"

const Button: Component = {
    data() {
        return {
            age: 18,
            name: '小满'
        }
    },
    beforeCreated() {
        console.log('beforeCreated', this)
    },
    created() {
        console.log('created', this)
    },
    beforeMount() {
        // div = document.querySelector('#div')
        //console.log('beforeMount',div)
    },
    mounted() {
        //const div = document.querySelector('#div')
        //console.log('mounted',div)
    },
    beforeUpdate() {
        console.log('beforeUpdate')
    },
    updated() {
        console.log('updated')
    },
    render(): Vnode {
        return h('div', { id: 'div' }, [
            {
                tag: 'p',
                key: 1,
                children: this.name,
                props: {
                    id: 'p1',
                    on: {
                        click: () => {
                            for (var i = 0; i < 99; i++) {
                                this.name = '大满' + i
                            }
                            nextTick().then(() => {
                                const p1 = document.querySelector('#p1')
                                console.log(p1.innerHTML, 'ccccc')
                            })
                        },
                    }
                }
            },
            {
                tag: 'p',
                key: 2,
                children: this.age + '岁'
            }
        ])
    }
}

export const MyButton: Vnode = {
    tag: Button
}