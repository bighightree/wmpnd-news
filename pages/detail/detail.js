// pages/detail/detail.js
Page({
    data: {},

    onLoad() {
        let po = this
        wx.request({
            url: 'https://test-miniprogram.com/api/news/detail',

            data: {
                id: '1552623252481',
            },

            success(res) {
                let result = res.data.result
                console.log(res)
                po.setData({
                    title: result.title,
                    time: result.date.substring(11, 16),
                    readCount: result.readCount,
                    source: result.source,
                    firstImage: result.firstImage,
                    mainBody: result.content,
                })
            }
        })
    }
})