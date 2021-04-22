export interface IMenuData {
  pId: number //父id
  name: string //菜单名称
  url: string //菜单地址
  state: number //菜单状态，1：可用，2：不可用
  mOrder: number //菜单顺序
  mType: number //品牌菜单还是门店菜单，1：品牌，2：门店
  type: number //该url地址是菜单还是权限，1：菜单，2：权限
}
