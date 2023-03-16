

export class AppGlobals {
    private static location: string = 'ica_local';


    static getBaseUrl() {

        let url = 'http://localhost:64209/'
        switch (this.location) {
            case 'ica_desa':
                url = 'http://localhost:64209/';
                break;
            case 'ica_local':
                url = 'http://localhost:64209/';
                break;
        }
        return url
        // let url = 'http://localhost:53960/'
        // switch (this.location) {
        //     case 'ica_desa':
        //         url = 'http://localhost:53960/';
        //         break;
        //     case 'ica_local':
        //         url = 'http://localhost:53960/';
        //         break;
        // }
        // return url

    }


    //MESSAGES
    public static readonly MSG_NETWORK_API: string = 'Error: Favor validar su conexión de internet o de servio de API';
    public static readonly MSG_CONTACT_ADMIN: string = 'Favor comunicar con el administrador del sistema';
    public static readonly MSG_LOGIN_FAILED: string = 'No se pudo completar el login, Favor validar su Usuario y Password';
    public static readonly MSG_NOT_AUTHORIZED_API: string = 'Warning: No cuenta con autorización o Favor logearse de nuevo';
}