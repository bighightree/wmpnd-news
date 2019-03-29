//index.js
const tabMap = {
    '国内': 'gn',
    '国际': 'gj',
    '财经': 'cj',
    '娱乐': 'yl',
    '军事': 'js',
    '体育': 'ty',
    '其他': 'other',
}

Page({
    data: {
        tabList: [{
                name: '国内'
            },
            {
                name: '国际'
            },
            {
                name: '财经'
            },
            {
                name: '娱乐'
            },
            {
                name: '军事'
            },
            {
                name: '体育'
            },
            {
                name: '其他'
            },
        ],

        newsType: 'gn',

        newsList: [],
    },

    onLoad() {
        this.getNewsList('gn')
    },

    onPullDownRefresh() {
        this.getNewsList(this.data.newsType, () => {
            wx.stopPullDownRefresh()
            console.log('Stop PullDown Refresh!')
        })
    },

    getNewsList(type, callback) {
        let po = this
        wx.request({
            url: 'https://test-miniprogram.com/api/news/list',

            data: {
                type: type,
            },

            success(res) {
                console.log(`Request newsList ${type} success!`)
                let tmpNewsList = []
                let result = res.data.result
                for (let i = 0; i < result.length; i++) {
                    tmpNewsList.push({
                        id: result[i].id,
                        title: result[i].title,
                        time: result[i].date.substring(11, 16),
                        source: result[i].source,
                        imgPath: result[i].firstImage,
                    })
                }
                po.setData({
                    newsList: tmpNewsList,
                })
            },

            fail(res) {
                console.log(res)
            },

            complete() {
                callback && callback()
            }
        })
    },

    tapTabItem(event) {
        // console.log(event)
        let type = tabMap[event.target.dataset.type]
        console.log(type)
        this.setData({
            newsType: type
        })
        this.getNewsList(type)
    }
})