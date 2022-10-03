import { usePediaAction, usePediaUseAction, useHeaderEditAction, useExternalDependencyAction, useRegisterAction, useNotionAction, useMarkAction, useSearchAction,useManagerAction } from './GetAxios';
import { usePediaParams, usePediaUserParams, useHeaderEditParams, useExternalDependency, useRegisterParams, useNoticeParams, useMarkParams, useSearchParams,useMangerParams } from './params';

/**
 * EXEC [utility].[spSchemap_20220914]
 * Body資料
 */
export const apiUsePediaAction = usePediaAction;
export const apiUsePediaParams = usePediaParams;

// EXEC [utility].[spSchemap_User]
export const apiUsePediaUseAction = usePediaUseAction;
export const apiUsePediaUserParams = usePediaUserParams;

// 各 DB service 四格
// 修改 DATABASE TABLE SP VIEW 修改標題描述
export const apiUseHeaderEditAction = useHeaderEditAction;
export const apiUseHeaderEditParams = useHeaderEditParams;

// 各 DB service 四格
// 外部相依性
export const apiUseExternalDependencyAction = useExternalDependencyAction;
export const apiUseExternalDependency = useExternalDependency;

/**
 * exec [utility].[spObject_Register]
 * -- 針對沒有註冊的物件，註冊
 */
export const apiUseRegisterAction = useRegisterAction;
export const apiUseRegisterParams = useRegisterParams;

/**
 * EXEC [obj].[spSchemap_Remark] 
 * -- 修該附註，分類附註
 */
export const apiUseNotionAction = useNotionAction;
export const apiUseNoticeParams = useNoticeParams;

/**
 * EXEC [utility].[spSchemap_Mark]
 * 訂閱語法
 * 目前先只使用 type = 1,訂閱
 */
export const apiUseMarkAction = useMarkAction;
export const apiUseMarkParams = useMarkParams;

/**
 * -- 搜尋框
 * EXEC [ui].[spSchemapping]
 */
export const apiUseSearchAction = useSearchAction
export const apiUseSearchParams = useSearchParams


/**
 * -- 管理者權限
 * EXEC [obj].[spACL]
 */
export const apiUseManagerAction = useManagerAction
export const apiUseMangerParams=useMangerParams;
