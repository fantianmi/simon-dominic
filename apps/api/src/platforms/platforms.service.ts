import { Injectable } from '@nestjs/common';

export interface Platform {
  name: string;
  /** 官方链接；未能核实域名的平台为 null，前端展示“前往搜索”引导 */
  url: string | null;
  description: string;
  /** 主要推荐平台（如 GG租号） */
  primary: boolean;
}

/**
 * 业务边界：本站仅提供租号信息展示与第三方平台跳转指引，
 * 不参与账号托管、不代收押金、不代办上架。
 * 用户与平台之间的交易行为及风险，由用户自行承担。
 */
export const PLATFORM_NOTICE =
  '以下平台仅供参考，请自行阅读平台押金与赔付规则';

/**
 * 为避免写入未经核实的域名（钓鱼风险），仅 GG租号 提供了官方链接；
 * 其余平台的 url 置为 null，请自行搜索并核实官网后再使用。
 * 如需固定链接，请在核实域名真实性后于此处补全。
 */
const PLATFORMS: Platform[] = [
  {
    name: 'GG租号',
    url: 'https://www.ggzuhao.com',
    description: '综合租号平台，覆盖主流游戏，支持账号出租与租用。',
    primary: true,
  },
  {
    name: '虚贝租号',
    url: null,
    description: '游戏账号租赁平台，请自行核实官网域名与押金规则后使用。',
    primary: false,
  },
  {
    name: '闲游盒',
    url: null,
    description: '游戏账号交易/租赁相关平台，请自行核实官网域名与赔付规则后使用。',
    primary: false,
  },
  {
    name: 'U号租',
    url: null,
    description: '账号租赁平台，请自行核实官网域名与押金规则后使用。',
    primary: false,
  },
];

@Injectable()
export class PlatformsService {
  /** 返回租号平台列表与提示语 */
  getPlatforms() {
    return {
      notice: PLATFORM_NOTICE,
      boundary:
        '本站仅提供租号信息展示与第三方平台跳转指引，不参与账号托管、不代收押金、不代办上架。用户与平台之间的交易行为及风险，由用户自行承担。',
      platforms: PLATFORMS,
    };
  }
}
