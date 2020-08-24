
import axios from 'axios';
const axiosP = axios.create({
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

export const httpGet = (url, data) => {
    return new Promise((resolve, reject) => {
        axiosP.get(url,{params:data})
            .then(res => {
                console.log(1, res)
                resolve(() => {
                    if (res.data.code == 200) {
                        return res.data;
                    } else {
                        console.log(res);
                        alert(res.data.msg);
                    }
                });
            })
            .catch(err => {
                reject(
                    console.log(err, '网络错误，get请求失败'),
                    alert('网络错误，get请求失败')
                )
            })
    })
}
//注释：get传参数是要{params:data}，params是必须的，与post不同
