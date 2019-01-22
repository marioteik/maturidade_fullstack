import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ContextCore } from '../context/context.core';
import { CONTEXT_CORE } from '../injection-tokens';

@Injectable()
export class ContextHandlerService {
    constructor(
        @Inject(CONTEXT_CORE) private context: ContextCore
    ) { }

    public init(): void {
        // fazer algo na inicializaçào do contexto
    }

    public updateValue<T>(key: string, value: T, debounce?: number): T {
        return this.context.updateValue({ key, value, debounce });
    }

    public getContext<T>(path: string): BehaviorSubject<T> {
        return this.context.getSubject(path);
    }

    public getValueSync<T>(path): any {
        return this.context.getValueSync(path);
    }
}
