import { createAxios }from '@/plugins/app-axios';
import { serverApi } from '@/plugins/vue-api-server';
import emitter from '@/plugins/event-hub';

async function fetchAuthorityFromNetwork(){
    const url = serverApi('uri', 'get-sign-on');
    const urlInit = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: process.env.VUE_APP_SERVER_MODE !== 'loc'?'include':'omit',
        cache: 'no-store'
    };
    try {
        let response = await fetch(url, urlInit);
        if (response.ok) { // HTTP 상태 코드가 200~299일 경우
            // 응답 몬문을 받습니다(관련 메서드는 아래에서 설명).
            let js = await response.json();
            return js;
        } else {
            console.error("[AUTH] fetchLogOnProfileFromNetwork HTTP-Error: ", response.status);
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }
}

async function getSignGoogleOauthClientId(){
    const url = serverApi('uri', 'get-sign-google-oauth-client');
    const urlInit = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: process.env.VUE_APP_SERVER_MODE !== 'loc'?'include':'omit',
        cache: 'no-store'
    };
    try {
        let response = await fetch(url, urlInit);
        if (response.ok) { // HTTP 상태 코드가 200~299일 경우
            // 응답 몬문을 받습니다(관련 메서드는 아래에서 설명).
            let js = await response.json();
            return js;
        } else {
            console.error("[SIGN] getSignGoogleOauthClientId HTTP-Error: ", response.status);
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }
}

function checkPermission(pageCode){
    if( ! window.logOnProfile ) return false;

    const { permissions } = window.logOnProfile.data;
    return permissions.includes(pageCode);
}

// 하나라도 있으면 true
function checkPermissionArray( permissionArr ){
    if( ! permissionArr ) return false;
    for( const code of permissionArr ){
        if( checkPermission( code ) ) return true;
    }
    return false;
}

function checkPagePermission(){
    const pageCodeList = document.querySelector('meta[name="permission"]')?.content;

    if( !pageCodeList ) return;

    for (const pageCode of pageCodeList.split(',')) {
        if(checkPermission(pageCode)) return;
    }
    alert("You don't have permission this page");
    history.back();
}

async function initApp(app, disableSignOn){
    var isProd = process.env.NODE_ENV === 'production';
    // for debugging purpose
    if( isProd ){
        window.slog = function(){};
        window.slog.clear = function(){};
    }else{
        window.slog = console.log.bind(console);
        window.slog.clear = console.clear.bind(console);
    }


    window.logOnProfile = null;

    if( ! disableSignOn ){
        let authResponse = await fetchAuthorityFromNetwork();
        window.logOnProfile = authResponse;
        checkPagePermission();
    } else {
        //비 로그인시 구글 클라이언트 데이터를 가져온다
        let oauthClientResponse = await getSignGoogleOauthClientId();
        window.googleOauthClient = oauthClientResponse.data;
    }


    const init = () => console.log("plugin can be used!!");
    app.config.globalProperties.$init=init;

    // app.config.unwrapInjectedRef = true;
    app.config.globalProperties.$axios=createAxios(emitter);
    app.config.globalProperties.$api=serverApi;
    app.config.globalProperties.$emitter=emitter;
    app.config.globalProperties.$isLogOn=function(){
        let logOnProfile = window.logOnProfile;
        console.log('[AUTH] logOnProfile =', logOnProfile);
        return !!logOnProfile;
    }
    app.config.globalProperties.$appUtil={
        uuidv4, checkPermission, checkPermissionArray
    };

    app.provide('api', serverApi);
    app.provide('emitter', emitter);
    app.provide('axios', app.config.globalProperties.$axios);
    app.provide('appUtil', app.config.globalProperties.$appUtil);

    return app;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}

export {
    initApp
}