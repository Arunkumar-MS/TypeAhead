export const get = <T>(url: string): Promise<T> => {
    const xhr = new XMLHttpRequest();
    return new Promise((reslove, reject) => {
        const handelResponse = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    return reslove(data);
                }
                catch (e) {
                    reject({ status: xhr.status });
                }
            }
            reject({ status: xhr.status });
        };

        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = handelResponse;
    });
}