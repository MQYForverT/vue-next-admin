import type { App } from 'vue';
import { store } from '/@/store/index.ts';
import * as directives from '/@/directives'
import { ObjectDirective } from 'vue'

export function authDirective(app: App) {
	// 注册指令
	Object.keys(directives).forEach(key => {
		app.directive(key, (directives as { [key: string]: ObjectDirective })[key])
	})
}
