import { inject, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { CONTEXT_CORE, CONTEXT_KEYS, CONTEXT_WORKSPACE_KEYS } from '../injection-tokens';

import { WorkspaceService } from '@mfe/workspace-manager';

import { ContextHandlerService } from './context-handler.service';
import { ContextCore } from '../context/context.core';

describe('ContextHandlerService', () => {
    let masterService: ContextHandlerService;
    let valueWorkspaceServiceSpy: jasmine.SpyObj<WorkspaceService>;
    let valueContextCoreSpy: jasmine.SpyObj<ContextCore>;

    beforeEach(() => {
        const spyWorkspaceService = jasmine.createSpyObj('WorkspaceService', [
            'currentWorkspaceStateName',
            'currentWorkspace',
        ]);
        const spyContextCore = jasmine.createSpyObj('ContextCore', [
            'createContext',
            'destroyContext',
            'updateValue',
            'getSubject',
        ]);
        TestBed.configureTestingModule({
            providers: [
                ContextHandlerService,
                { provide: WorkspaceService, useValue: spyWorkspaceService },
                { provide: CONTEXT_CORE, useValue: spyContextCore },
                { provide: CONTEXT_KEYS, useValue: [{ contexts: { context: '1' } }] },
                { provide: CONTEXT_WORKSPACE_KEYS, useValue: [{ contexts: { context: '1' } }] },
            ],
        });
        masterService = TestBed.get(ContextHandlerService);
        valueWorkspaceServiceSpy = TestBed.get(WorkspaceService);
        valueContextCoreSpy = TestBed.get(CONTEXT_CORE);
    });

    it('should be created', () => {
        expect(masterService)
            .toBeTruthy();
    });

    it('Recebe o nome do contexto da base e utiliza as chaves de contexto gerais da base para '
        + ' inicializar tanto o contexto, verificar chamada do metodo createContext', () => {
            valueContextCoreSpy.createContext.and.callThrough();
            masterService.init('Context1');
            expect(valueContextCoreSpy.createContext)
                .toHaveBeenCalled();
        });

    it('Recebe o nome do contexto da base e utiliza as chaves de contexto gerais da base para '
        + ' inicializar tanto o contexto verificar se o retorno e undefined', () => {
            valueContextCoreSpy.createContext.and.callThrough();
            const retorno = masterService.init('Context1');
            expect(retorno)
                .toBeUndefined();
        });

    it('Recebe o nome do contexto da workspace e utiliza as chaves de contexto gerais dos '
        + ' workspaces para inicializar, verificar chamada do metodo createContext', () => {
            valueContextCoreSpy.createContext.and.callThrough();
            masterService.initWorkspaceContext('Context1');
            expect(valueContextCoreSpy.createContext)
                .toHaveBeenCalled();
        });

    it('Recebe o nome do contexto da workspace e utiliza as chaves de contexto gerais dos '
        + ' workspaces para inicializar, verificar se o retorno e undefined', () => {
            valueContextCoreSpy.createContext.and.callThrough();
            const retorno = masterService.initWorkspaceContext('Context1');
            expect(retorno)
                .toBeUndefined();
        });

    it('Destroi os dados de um determinado contexto dentro de um determinado workspace'
        + ' Ele remove tanto o contexto, verificar chamada do metodo destroyContext', () => {
            valueContextCoreSpy.destroyContext.and.stub();
            masterService.destroyWorkspaceContext('Context1');
            expect(valueContextCoreSpy.destroyContext)
                .toHaveBeenCalled();
        });

    it('Destroi os dados de um determinado contexto dentro de um determinado workspace. '
        + ' Ele remove tanto o contexto verificar se o retorno e undefined', () => {
            valueContextCoreSpy.destroyContext.and.callThrough();
            const retorno = masterService.destroyWorkspaceContext('Context1');
            expect(retorno)
                .toBeUndefined();
        });

    it('Altera o valor de um determinado contexto. Nenhum feedback da transação com o componente'
        + ' de contexto é  retornado, verificar chamada do metodo updateValue', () => {
            valueContextCoreSpy.updateValue.and.returnValue(Observable.of('teste'));
            masterService.updateValue('Context1', 'teste1', 1000);
            expect(valueContextCoreSpy.updateValue)
                .toHaveBeenCalled();
        });

    it('Altera o valor de um determinado contexto. Nenhum feedback da transação com o componente'
        + ' de contexto é  retornado. Verificar se o retorno e undefined', () => {
            valueContextCoreSpy.updateValue.and.returnValue(Observable.of('teste'));
            const retorno = masterService.updateValue('Context1', 'teste1', 1000);
            expect(retorno)
                .toBeUndefined();
        });

    it('Recebe a chave em que se quer alterar o valor, pega-se o nome do contexto em que o '
        + ' workspace está inserido, verificar chamada do metodo currentWorkspace', () => {
            valueWorkspaceServiceSpy.currentWorkspace.and.returnValue({ name: 'workspace1', state: { name: 'state1' } });
            valueContextCoreSpy.updateValue.and.returnValue(Observable.of('teste'));
            masterService.updateWorkspaceValue('Context1', 'teste1', 1000);
            expect(valueWorkspaceServiceSpy.currentWorkspace)
                .toHaveBeenCalled();
        });

    it('Recebe a chave em que se quer alterar o valor, pega-se o nome do contexto em que o '
        + ' workspace está inserido. Verificar se o retorno e undefined', () => {
            valueWorkspaceServiceSpy.currentWorkspace.and.returnValue({ name: 'workspace1', state: { name: 'state1' } });
            valueContextCoreSpy.updateValue.and.returnValue(Observable.of('teste'));
            const retorno = masterService.updateWorkspaceValue('Context1', 'teste1', 1000);
            expect(retorno)
                .toBeUndefined();
        });

    it('Método que retorna o BehaviorSubject previamente criado (na inicialização do módulo)', () => {
        valueWorkspaceServiceSpy.currentWorkspace.and.returnValue({ name: 'workspace1', state: { name: 'state1' } });
        const behave = new BehaviorSubject('behave1');
        valueContextCoreSpy.getSubject.and.returnValue(behave);
        masterService.getContext('Path1');
        expect(valueContextCoreSpy.getSubject)
            .toHaveBeenCalled();
    });
});
