// pages/detail/detail.js
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