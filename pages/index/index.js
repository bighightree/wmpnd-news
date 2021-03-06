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

const NUMBEROFTYPE = 7
const DEFAULTSOURCE = '网络来源'
const IMAGEHOLDER = '../../images/img_holder.jpg'

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

        tabFontWeight: ['bold', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal'],

        tabTextDeco: ['underline', 'none', 'none', 'none', 'none', 'none', 'none'],

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
                        // 如果字段不存在或者字段为空字符串，则设置为默认值
                        source: (!result[i].source || result[i].source === '') ? DEFAULTSOURCE : result[i].source,
                        imgPath: (!result[i].firstImage || result[i].firstImage === '') ? IMAGEHOLDER : result[i].firstImage,
                    })
                }
                po.setData({
                    newsList: tmpNewsList,
                })
            },

            fail(res) {
                console.log(res)
                wx.showToast({
                    title: '新闻获取失败，请检查网络或稍后再试',
                    icon: 'none'
                })
            },

            complete() {
                callback && callback()
            }
        })
    },

    tapTabItem(event) {
        // console.log(event)
        let type = tabMap[event.target.dataset.type]
        let id = event.target.dataset.id

        // 修改顶栏分类的样式
        let tmpFW = [],
            tmpTD = []
        for (let i = 0; i < NUMBEROFTYPE; i++) {
            if (i === id) {
                tmpFW[i] = 'bold'
                tmpTD[i] = 'underline'
            } else {
                tmpFW[i] = 'normal'
                tmpTD[i] = 'none'
            }
        }

        this.setData({
            newsType: type,
            tabFontWeight: tmpFW,
            tabTextDeco: tmpTD,
        })
        this.getNewsList(type)
    },

    gotoDetail(event) {
        // console.log(event)
        let id = event.currentTarget.dataset.id
        console.log('index send id ' + id)
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + id,
        })
    }
})