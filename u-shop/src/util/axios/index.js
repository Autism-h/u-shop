import http from './axios'

/* 菜单管理 */

//菜单列表
export function menuList() {
    return http.get('/api/menulist?istree=true')
}

//添加菜单
export function addmenu(data) {
    return http.post('/api/menuadd', data)
}

//删除一条列表数据
export function delMenu(data) {
    return http.post('/api/menudelete', data)
}

//封装菜单列表一条数据
export function menuInfo(params) {
    return http.get('/api/menuinfo', {
        params
    })
}

//封装一个菜单编辑窗口
export function menuEdit(data) {
    return http.post('/api/menuedit', data)
}

// ==========================================================

/* 角色管理 */

//封装角色添加接口
export function addRole(data) {
    return http.post('/api/roleadd',data)
}

//封装角色列表
export function roleList() {
    return http.get('/api/rolelist')
}

//封装删除一条数据接口
export function delRole (data){
    return http.post('/api/roledelete',data)
}

//封装一个获取一条数据接口
export function roleInfo(params) {
    return http.get('/api/roleinfo', {
        params
    })
}

//封装一个角色修改
export function roleEdit(data){
    return http.post('/api/roleedit',data)
}


// ==========================================================

/* 管理员管理 */

//管理员添加接口
export function addUser(data){
    return http.post('/api/useradd',data)
}

// 管理员列表接口
export function userList(params){
    return http.get('/api/userlist',{
        params
    })
}

//管理员总数（用于计算分页）
export function userCount(){
    return http.get('/api/usercount')
}

//管理员删除
export function delUser(data){
    return http.post('/api/userdelete',data)
}

//管理员获取（一条）
export function userInfo(params){
    return http.get('/api/userinfo',{
        params
    })
}

//管理员修改
export function editUser(data){
    return http.post('/api/useredit',data)
}

//管理员登录
export function userLogin(data){
    return http.post('/api/userlogin',data)
}


// ==========================================================

/* 商品分类 */

// 商品分类添加
export function addCate(data){
    return http.post('/api/cateadd',data)
}

//商品分类列表
export function cateList(){
    return http.get('/api/catelist',{
        params:{
            istree:true
        }
    })
}

//分类获取（一条）接口
export function CateInfo(params){
    return http.get('/api/cateinfo',{
        params
    })
}
//分类修改接口
export function CateEdit(data){
    return http.post('/api/cateedit',data)
}
//分类删除接口
export function CateDelete(data){
    return http.post('/api/catedelete',data)
}


// ==========================================================

/* 商品规格 */

//商品规格添加
export function addSpecs(data){
    return http.post('/api/specsadd',data)
}

// 商品规格接口
export function SpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}

//商品规格总数
export function SpecsCount(){
    return http.get('/api/specscount')
}

//商品规格删除
export function delSpecs(data){
    return http.post('/api/specsdelete',data)
}

//商品规格获取（一条）
export function specsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })
}

//商品规格修改
export function SpecsEdit(data){
    return http.post('/api/specsedit',data)
}


// ==========================================================

/* 商品管理 */

// 商品管理添加
export function goodsadd(data){
    return http.post('/api/goodsadd',data)
}

//商品管理列表
export function GoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}

//商品管理总数
export function GoodsCount(){
    return http.get('/api/goodscount')
}

//商品管理获取（一条）接口
export function goodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}

//商品管理修改接口
export function GoodsEdit(data){
    return http.post('/api/goodsedit',data)
}

//商品管理删除接口
export function GoodsDelete(data){
    return http.post('/api/goodsdelete',data)
}


// ==========================================================

/* 轮播图管理 */

// 轮播图管理添加
export function addBanner(data){
    return http.post('/api/banneradd',data)
}

//轮播图管理列表
export function BannerList(){
    return http.get('/api/bannerlist')
}

//轮播图管理获取（一条）接口
export function BannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })
}

//轮播图管理修改接口
export function BannerEdit(data){
    return http.post('/api/banneredit',data)
}
//轮播图管理删除接口
export function BannerDelete(data){
    return http.post('/api/bannerdelete',data)
}