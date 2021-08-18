export function alertErrorMessage(error) {
    let message = '';
    if (error.isAxiosError) {
        const responseError = error.response;
        if (responseError.status >= 400) {
            if (responseError.status === 404) {
                message = responseError.path + ' ' + responseError.error;
            } else {
                if (responseError.data.uimessage) {
                    message = responseError.data.uimessage[0] ? (responseError.data.uimessage[0].text + '\n') : '';
                    if (responseError.data.iomessage.length > 0) {
                        message = message + (responseError.data.iomessage[1] ? responseError.data.iomessage[1].text : responseError.data.iomessage[0].text) + '\n';
                    }
                } else {
                    message = 'untitled_error';
                }
            }
        } else {
            message = 'could_not_connect_server';
        }
    } else {
        if (error.name === 'HttpErrorResponse') {
            if (error.status === 400) {
                message = 'Post edilen veri hatalı';
            } else {
                message = 'could_not_connect_server';
            }
        } else {
            message = error.message ? error.message : error.toString();
        }
    }
    return message;
}
