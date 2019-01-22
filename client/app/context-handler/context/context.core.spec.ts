import { inject, TestBed } from '@angular/core/testing';

import { ContextCore } from '../context/context.core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AnonymousSubject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

describe('ContextCore', () => {
    let masterService: ContextCore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ContextCore,
            ],
        });
        masterService = TestBed.get(ContextCore);
    });

    it('should be created', () => {
        expect(masterService)
            .toBeTruthy();
    });

    it('Cria o contexto dentro do objeto de contexto', () => {
        masterService.createContext('context1', ['key1', 'key2']);
        expect(masterService.contexts)
            .toBeDefined();
    });

    it('Tentar criar o contexto quando o mesmo já está inicializado', () => {
        const constextName = 'context1';
        masterService.createContext(constextName, ['test-context']);
        masterService.createContext(constextName, ['key1', 'key2']);
        expect(masterService.contexts[constextName])
            .toEqual({ 'test-context': undefined });
    });

    it('Remove contexto especificado dentro do objeto de contexto', () => {
        masterService.contexts = { name: 'context1' };
        const retorno = masterService.destroyContext('context1');
        expect(retorno)
            .toBeUndefined();
    });

    it('Retorna o valor do contexto pedido', () => {
        masterService.contexts = { name: 'context1' };
        const retorno = masterService.getValue('path1');
        expect(retorno)
            .toBeUndefined();
    });

    it('Método que adiciona Subject, com ele achando o subject', () => {
        masterService.subjects = { subject1: 'subject1' };
        const retorno = masterService.addSubject('subject1');
        expect(retorno)
            .toBeUndefined();
    });

    it('Método que adiciona Subject, com ele não achando o subject', () => {
        masterService.subjects = { subject2: 'subject1' };
        const retorno = masterService.addSubject('subject1');
        expect(retorno)
            .toBeUndefined();
    });

    it('Método que recebe a chave do subscribe, se ela não existir, primeiro... testando com contexto', () => {
        masterService.contexts = { name: 'context1' };
        const retorno = masterService.getSubject('name');
        expect(retorno.value)
            .toBe('context1');
    });

    it('Método que recebe a chave do subscribe, se ela não existir, primeiro... testando com contexto e subject', () => {
        masterService.subjects = { name: 'subject1' };
        masterService.contexts = { name: 'context1' };
        const retorno = masterService.getSubject('name');
        expect(retorno)
            .toBeDefined();
    });

    it('Método que recebe a chave do subscribe, se ela não existir, primeiro... testando com contexto e sem subject', () => {
        masterService.contexts = { name: 'context1' };
        const retorno = masterService.getSubject('name');
        expect(retorno)
            .toBeDefined();
    });

    it('Método que recebe a chave do subscribe, se ela não existir, primeiro... testando sem contexto', () => {
        masterService.contexts = { name: 'context1' };
        const retorno = masterService.getSubject('name1');
        expect(retorno.value)
            .toBeUndefined();
    });

    it('Método verifica se tem contexto', () => {
        masterService.contexts = { name: 'context1' };
        const retorno = masterService.hasContext('name');
        expect(retorno)
            .toBeTruthy();
    });

    it('Método que da update no valor, com bounce maior 0', () => {
        const value = 'teste1';
        const retorno = masterService.updateValue({ key: 'Context1', value, debounce: 1000 });
        expect(retorno)
            .toEqual(value);
    });

    it('Método que da update no valor, com bounce igual a zero', () => {
        const value = 'teste1';
        const retorno = masterService.updateValue({ key: 'Context1', value, debounce: 0 });
        expect(retorno)
            .toEqual(value);
    });

    it('Método que da update no valor, sem bounce', () => {
        const value = 'teste1';
        const retorno = masterService.updateValue({ key: 'Context1', value });
        expect(retorno)
            .toEqual(value);
    });

    // it('Método que da update no valor, utilizando um array de middlewares', () => {
    //     const newValue = 'teste1';
    //     const middlewares = [
    //         (key, value) => new BehaviorSubject(value),
    //         (key, value) => new BehaviorSubject(value),
    //     ];
    //     const retorno = masterService.updateValue('Context1', newValue, 0, middlewares);
    //     expect(retorno)
    //         .toEqual(jasmine.any(Observable));
    // });
});
