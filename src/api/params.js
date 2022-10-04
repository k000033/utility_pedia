const getHubUrl = new URL(window.location.href);
let host = new URL(`https://1.com?${getHubUrl.href.split("?")[1]}`).searchParams.get("host");
let db_name = new URL(`https://1.com?${getHubUrl.href.split("?")[1]}`).searchParams.get("db");
let username = new URL(`https://1.com?${getHubUrl.href.split("?")[1]}`).searchParams.get("username");

/**
 * EXEC [utility].[spSchemap_20220914]
 * Body資料
 */
export class usePediaParams {
    constructor() {
        // this.HOST = `${host}`,
        //     this.DB_NAME = `${db_name}`,
        //     this.SCHEMA_NAME = "",
        //     this.OBJECT_NAME = "",
        //     this.DESCRIPTION = "",
        //     this.SCHEMA_NAME_TABLE = "",
        //     this.NOTES_ID = "",
            this.UID='';
            this.USER_ID = `${username}`;
    }

    initalPaarams() {
        // this.HOST = "",
        //     this.DB_NAME = "",
        //     this.SCHEMA_NAME = "",
        //     this.OBJECT_NAME = "",
        //     this.DESCRIPTION = "",
        //     this.SCHEMA_NAME_TABLE = "",
            this.UID='';
            this.NOTES_ID = ""

    }
}

// EXEC [utility].[spSchemap_User]
export class usePediaUserParams {
    constructor() {
        this.HOST = '',
            this.DB_NAME = '',
            this.SCHEMA_NAME = "",
            this.OBJECT_NAME = "",
            this.NOTES_ID="",
            this.LEVEL_TYPE="",
            this.CATEGORY="",
            this.DESCRIPTION = "",
            this.SQL="",
            this.AUTORUN='',
            this.TYPE = "",
            this.USER_ID = `${username}`;
    }

    initalPaarams() {
        this.HOST = '',
            this.DB_NAME = '',
            this.SCHEMA_NAME = "",
            this.OBJECT_NAME = "",
            this.NOTES_ID="",
            this.LEVEL_TYPE="",
            this.CATEGORY="",
            this.DESCRIPTION = "",
            this.SQL="",
            this.AUTORUN='',
            this.TYPE = ""

    }
}

// 各 DB service 四格
// 修改 DATABASE TABLE SP VIEW 修改標題描述
export class useHeaderEditParams{
    constructor(){
        this._NAME="";
        this.DB_NAME="";
        this.SCHEMA_NAME="";
        this.OBJECT_NAME="";
        this.COLUMN_NAME='';
        this.LEVELTYPE="";
        this.ATTR_TYPE="";
        this.VALUE="";
        this.SQL="";
        this.USER_ID = `${username}`;
    }
    initalPaarams(){
        this._NAME="";
        this.DB_NAME="";
        this.SCHEMA_NAME="";
        this.OBJECT_NAME="";
        this.COLUMN_NAME='';
        this.LEVELTYPE="";
        this.ATTR_TYPE="";
        this.VALUE="";
        this.SQL="";
    }
}
// 各 DB service 四格
// 外部相依性
export class useExternalDependency{
    constructor(){
        this._NAME="";
        this.DB_NAME ='';
        this.OBJECT_ID ="";
    }
    initalPaarams(){
        this._NAME="";
        this.DB_NAME ='';
        this.OBJECT_ID ="";
    }
}

/**
 * exec [utility].[spObject_Register]
 * -- 針對沒有註冊的物件，註冊
 */
export class useRegisterParams{
    constructor(){
    this.PID='';
    this.OBJECT='';
    this.OBJECT_ID ='';
    this.OBJECT_LEVEL ='';
    this.UID = '';
    this.USER_ID = `${username}`;
    }
    initalPaarams(){
        this.PID='';
        this.OBJECT='';
        this.OBJECT_ID ='';
        this.UID = '';
        this.OBJECT_LEVEL ='';
    }
}

/**
 * EXEC [obj].[spSchemap_Remark] 
 * -- 修該附註，分類附註
 */
export class useNoticeParams{
    constructor(){
        this.UID='';
        this.NOTES_ID ='';
        this.EXEC_SQL_ID ='';
        this.LEVEL_TYPE ='';
        this.CATEGORY ='';
        this.DESCRIPTION ='';
        this.SQL ='';
        this.AUTORUN ='';
        this.USER_ID = `${username}`;
    }
    initalPaarams(){
        this.UID='';
        this.NOTES_ID ='';
        this.EXEC_SQL_ID ='';
        this.LEVEL_TYPE ='';
        this.CATEGORY ='';
        this.DESCRIPTION ='';
        this.SQL ='';
        this.AUTORUN ='';
    }
}

/**
 * EXEC [utility].[spSchemap_Mark]
 * 訂閱語法
 * 目前先只使用 type = 1,訂閱
 */
export class useMarkParams{
    constructor(){
        this.UID ="";
        this.APPLICATION_ID ="";
        this.TYPE ="";
        this.USER_ID = `${username}`;
    }
    initalPaarams(){
        this.UID ="";
        this.APPLICATION_ID ="";
        this.TYPE ="";
    };
};

/**
 * -- 搜尋框
 * EXEC [ui].[spSchemapping]
 */
export class useSearchParams{
    constructor(){
        this.FILTER="";
        this.SEARCH_TYPE="";
        this.OBJECTS_TYPE="";
        this.USER_ID="";
    }

    initalPaarams(){
        this.FILTER="";
        this.SEARCH_TYPE="";
        this.OBJECTS_TYPE="";
        this.USER_ID = `${username}`;
    }
}


/**
 * -- 管理者權限
 * EXEC [obj].[spACL]
 */
export class useMangerParams{
    constructor(){
        this.UID="";
        this.PID="";
        this.USER_ID = "";
        this.ROLE="";
        this.BY_OBJECT="";
    }
    intitalParams(){
        this.UID="";
        this.PID="";
        this.USER_ID = "";
        this.ROLE="";
        this.BY_OBJECT="";
    }
}


/**
 * --  取得UID 
 */
export class useGetUIDParams{
    constructor(){
      this._HOST="";
      this._DB_NAME="";
      this._OBJECT ="";
    }
    initalPaarams(){
      this._HOST="";
      this._DB_NAME="";
      this._OBJECT ="";
    }
}

