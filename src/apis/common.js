/**
 * 获取vue文件
 * @param params {{}}
 * @returns {Promise<any>}
 */
export async function reqVueFile(params = {}) {
  let [err, res] = await ZY.awaitTo(globalThis.Req.get('/api/zy-boot/json/getVueFile', {
    params
  }));
  if (err) {
    console.log('get file failed', err)
    return Promise.reject(err);
  }
  if (res.result) {
    let url = res?.result?.url
    let [fetchErr, fetchRes] = await ZY.awaitTo(fetch(url));
    if (fetchErr) {
      console.log('fetch file failed', fetchErr)
      return Promise.reject(fetchErr);
    }
    return fetchRes.text();
  }
  return res

}
