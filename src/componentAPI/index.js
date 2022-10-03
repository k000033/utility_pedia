
import {getNowTime} from './getNowDate';
import {switchCpSqlName} from './switchCpSqlName'
import {getBodyData} from './getBodyData'
import {exportDBInfo} from './getDBInfo'
import {exportNoteInfo} from './getNoteInfo'
import {exportSearchInfo} from './getSearchInfo'
import {exportManagerData} from './getManagerData'
export const apiGetNowTime = getNowTime;
export const apiSwitchCpSqlName = switchCpSqlName;
export const apiGetBodyDataAction = getBodyData;
export const apiExportDBIfno = exportDBInfo;
export const apiExportNoteIfno = exportNoteInfo;
export const apiExportSearchInfo = exportSearchInfo;
export const apiExportManagerData = exportManagerData;