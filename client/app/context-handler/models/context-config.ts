/**
 * Objeto interface de ContextConfig
 */
export interface ContextConfig {
    /**
     * sessionId string
     */
    sessionId?: string;
    /**
     * contextName string
     */
    contextName?: string;
    /**
     * contextKeys Array de string
     *
     * @deprecated Esse atributo será descontinuado. Ver contextSessionKeys.
     */
    contextKeys?: Array<string>;
    /**
     * contextSessionKeys Array de string
     */
    contextSessionKeys?: Array<string>;
    /**
     * contextWorkspaceKeys Array de string
     */
    contextWorkspaceKeys?: Array<string>;
}
