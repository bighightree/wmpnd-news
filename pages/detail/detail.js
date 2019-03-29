// pages/detail/detail.js
const DEFAULTSOURCE = '网络来源'
const IMAGEHOLDER = '../../images/img_holder.jpg'

Page({
    data: {},

    onLoad(option) {
        let po = this
        console.log('detail get id' + option.id)
        wx.request({
            url: 'https://test-miniprogram.com/api/news/detail',

            data: {
                id: option.id,
            },

            success(res) {
                let result = res.data.result
                // console.log(res)
                // 事先检查一遍图片地址是否存在或者是否为空字符串，若是则设置为默认值
                for (let i = 0; i < result.content.length; i++) {
                    if (result.content[i].type === 'image') {
                        if (!result.content[i].src || result.content[i].src === '') {
                            result.content[i].src = IMAGEHOLDER
                        }
                    }
                }
                po.setData({
                    title: result.title,
                    time: result.date.substring(11, 16),
                    readCount: result.readCount,
                    // 若 source 字段不存在或者为空字符串，则设置为默认值
                    source: (!result.source || result.source === '') ? DEFAULTSOURCE : result.source,
                    mainBody: result.content,
                })
            }
        })
    }
})