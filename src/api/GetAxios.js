import axios from 'axios'

const defineAxios = axios.create({
baseURL: 'http://localhost/work/carryProject.ashx' //測試

 //baseURL: `${location.origin}/work/carryProject.ashx` //正式
})
// EXEC [utility].[spSchemap_20220914]
export const usePediaAction = (params) => {
    console.log('-- _NAME === ' + 'uhc.Item');
    console.log('-- _TYPE === ' + '');
    console.log('-- UID === ' + params.UID);
    // console.log('-- HOST === ' + params.HOST);
    // console.log('-- DB_NAME === ' + params.DB_NAME);
    // console.log('-- SCHEMA_NAME === ' + params.SCHEMA_NAME);
    // console.log('-- OBJECT_NAME === ' + params.OBJECT_NAME);
    // console.log('-- DESCRIPTION === ' + params.DESCRIPTION);
    // console.log('-- SCHEMA_NAME_TABLE === ' + params.SCHEMA_NAME_TABLE);
    // console.log('-- NOTES_ID === ' + params.NOTES_ID);
    console.log('-- USER_ID === ' + params.USER_ID);
    return defineAxios.get('', {
        params: {
            _NAME: "utility.Pedia",
            _TYPE: "",
            UID: params.UID,
            // HOST:params.HOST,
            // DB_NAME:params.DB_NAME,
            // SCHEMA_NAME:params.SCHEMA_NAME,
            // OBJECT_NAME:params.OBJECT_NAME,
            // DESCRIPTION:params.DESCRIPTION,
            // SCHEMA_NAME_TABLE :params.SCHEMA_NAME_TABLE,
            // NOTES_ID:params.NOTES_ID,
            USER_ID: params.USER_ID
        }
    })
}
// EXEC [utility].[spSchemap_User]
export const usePediaUseAction = (params) => {
    console.log('-- _NAME === ' + 'uhc.Item');
    console.log('-- _TYPE === ' + 'INSERT');
    console.log('-- HOST === ' + params.HOST);
    console.log('-- DB_NAME === ' + params.DB_NAME);
    console.log('-- SCHEMA_NAME ==                                      = ' + params.SCHEMA_NAME);
    console.log('-- OBJECT_NAME === ' + params.OBJECT_NAME);
    console.log('-- NOTES_ID === ' + params.NOTES_ID);
    console.log('-- LEVEL_TYPE === ' + params.LEVEL_TYPE);
    console.log('-- CATEGORY === ' + params.CATEGORY);
    console.log('-- DESCRIPTION === ' + params.DESCRIPTION);
    console.log('-- SQL === ' + params.SQL);
    console.log('-- AUTORUN === ' + params.AUTORUN);
    console.log('-- TYPE === ' + params.TYPE);
    console.log('-- USER_ID === ' + params.USER_ID);
    return defineAxios.get('', {
        params: {
            _NAME: "utility.Pedia",
            _TYPE: "INSERT",
            HOST: params.HOST,
            DB_NAME: params.DB_NAME,
            SCHEMA_NAME: params.SCHEMA_NAME,
            OBJECT_NAME: params.OBJECT_NAME,
            NOTES_ID: params.NOTES_ID,
            LEVEL_TYPE: params.LEVEL_TYPE,
            CATEGORY: params.CATEGORY,
            DESCRIPTION: params.DESCRIPTION,
            SQL: params.SQL,
            AUTORUN: params.AUTORUN,
            TYPE: params.TYPE,
            USER_ID: params.USER_ID
        }
    })
}

// 各 DB service 四格   
export const useHeaderEditAction = (params) => {
    console.log('-- _NAME === ' + params._NAME);
    console.log('-- _TYPE === ' + 'UPDATE');
    console.log('-- DB_NAME === ' + params.DB_NAME);
    console.log('-- SCHEMA_NAME === ' + params.SCHEMA_NAME);
    console.log('-- OBJECT_NAME === ' + params.OBJECT_NAME);
    console.log('-- COLUMN_NAME === ' + params.COLUMN_NAME);
    console.log('-- LEVELTYPE === ' + params.LEVELTYPE);
    console.log('-- ATTR_TYPE === ' + params.ATTR_TYPE);
    console.log('-- VALUE === ' + params.VALUE);
    console.log('-- SQL === ' + params.SQL);
    console.log('-- USER_ID === ' + params.USER_ID);
    return defineAxios.get('', {
        params: {
            _NAME: params._NAME,
            _TYPE: "UPDATE",
            DB_NAME: params.DB_NAME,
            SCHEMA_NAME: params.SCHEMA_NAME,
            OBJECT_NAME: params.OBJECT_NAME,
            COLUMN_NAME: params.COLUMN_NAME,
            LEVELTYPE: params.LEVELTYPE,
            ATTR_TYPE: params.ATTR_TYPE,
            VALUE: params.VALUE,
            SQL: params.SQL,
            USER_ID: params.USER_ID
        }
    })
}

// 各 DB service 四格
export const useExternalDependencyAction = (params) => {
    console.log('-- _NAME === ' + params._NAME);
    console.log('-- _TYPE === ' + 'DELETE');
    console.log('-- DB_NAME === ' + params.DB_NAME);
    console.log('-- OBJECT_ID === ' + params.OBJECT_ID);
    return defineAxios.get('', {
        params: {
            _NAME: params._NAME,
            _TYPE: 'DELETE',
            DB_NAME: params.DB_NAME,
            OBJECT_ID: params.OBJECT_ID
        }
    })
};

// exec [utility].[spObject_Register]
export const useRegisterAction = (params) => {
    console.log('-- _NAME === ' + 'utility.Pedia');
    console.log('-- _TYPE === ' + 'UPDATE');
    console.log('-- PID === ' + params.PID);
    console.log('-- OBJECT === ' + params.OBJECT);
    console.log('-- OBJECT_ID === ' + params.OBJECT_ID);
    console.log('-- OBJECT_LEVEL === ' + params.OBJECT_LEVEL);
    console.log('-- UID === ' + params.UID);
    console.log('-- USER_ID === ' + params.USER_ID);
    return defineAxios.get('', {
        params: {
            _NAME: "utility.Pedia",
            _TYPE: "UPDATE",
            PID: params.PID,
            OBJECT: params.OBJECT,
            OBJECT_ID: params.OBJECT_ID,
            OBJECT_LEVEL: params.OBJECT_LEVEL,
            UID: params.UID,
            USER_ID: params.USER_ID,
        }
    });
};

//EXEC [utility].[spSchemap_Notice]
export const useNotionAction = (params) => {
    console.log('-- _NAME === ' + 'utility.Pedia');
    console.log('-- _TYPE === ' + 'DELETE');
    console.log('-- UID === ' + params.UID);
    console.log('-- NOTES_ID === ' + params.NOTES_ID);
    console.log('-- EXEC_SQL_ID === ' + params.EXEC_SQL_ID);
    console.log('-- LEVEL_TYPE === ' + params.LEVEL_TYPE);
    console.log('-- CATEGORY === ' + params.CATEGORY);
    console.log('-- DESCRIPTION === ' + params.DESCRIPTION);
    console.log('-- SQL === ' + params.SQL);
    console.log('-- AUTORUN === ' + params.AUTORUN);
    console.log('-- USER_ID === ' + params.USER_ID);
    return defineAxios.get('', {
        params: {
            _NAME: "utility.Pedia",
            _TYPE: "DELETE",
            UID: params.UID,
            NOTES_ID: params.NOTES_ID,
            EXEC_SQL_ID: params.EXEC_SQL_ID,
            LEVEL_TYPE: params.LEVEL_TYPE,
            CATEGORY: params.CATEGORY,
            DESCRIPTION: params.DESCRIPTION,
            SQL: params.SQL,
            AUTORUN: params.AUTORUN,
            USER_ID: params.USER_ID,
        }
    });
};

//EXEC [utility].[spMark] 訂閱
export const useMarkAction = (params) => {
    console.log('-- _NAME === ' + 'utility.Pedia_2');
    console.log('-- _TYPE === ' + '');
    console.log('-- UID === ' + params.UID);
    console.log('-- APPLICATION_ID === ' + params.APPLICATION_ID);
    console.log('-- TYPE === ' + params.TYPE);
    console.log('-- USER_ID === ' + params.USER_ID);
    return defineAxios.get('', {
        params: {
            _NAME: "utility.Pedia_2",
            _TYPE: "",
            UID: params.UID,
            APPLICATION_ID: params.APPLICATION_ID,
            TYPE: params.TYPE,
            USER_ID: params.USER_ID,
        }
    });
};


/**
 * -- 搜尋框
 * EXEC [ui].[spSchemapping]
 */
export const useSearchAction = (params) => {
    console.log('-- _NAME === ' + 'utility.Pedia_2');
    console.log('-- _TYPE === ' + 'INSERT');
    console.log('-- FILTER === ' + params.FILTER);
    console.log('-- SEARCH_TYPE === ' + params.SEARCH_TYPE);
    console.log('-- OBJECT_TYPE === ' + params.OBJECTS_TYPE);
    console.log('-- USER_ID === ' + params.USER_ID);
    return defineAxios.get('', {
        params: {
            _NAME: "utility.Pedia_2",
            _TYPE: "INSERT",
            FILTER: params.FILTER,
            SEARCH_TYPE: params.SEARCH_TYPE,
            OBJECTS_TYPE:params.OBJECTS_TYPE,
            USER_ID: params.USER_ID,
        }
    });
};

/**
 * -- 管理者權限
 * EXEC [obj].[spACL]
 */
 export const useManagerAction = (params) => {
    console.log('-- _NAME === ' + 'utility.Pedia_2');
    console.log('-- _TYPE === ' + 'UPDATE');
    console.log('-- UID === ' + params.UID);
    console.log('-- USER_ID === ' + params.USER_ID);
    console.log('-- ROLE === ' + params.ROLE);
    console.log('-- PID === ' + params.PID);
    console.log('-- BY_OBJECT === ' + params.BY_OBJECT);
    return defineAxios.get('', {
        params: {
            _NAME: "utility.Pedia_2",
            _TYPE: "UPDATE",
            UID: params.UID,
            USER_ID: params.USER_ID,
            ROLE:params.ROLE,
            PID:params.PID,
            BY_OBJECT:params.BY_OBJECT
        }
    });
};





// http://localhost:8080/#/?username=0206712&host=192.168.100.199&db=UMP&schema=&object=
// this._NAME="";
// this.DB_NAME="";
// this.SCHEMA_NAME="";
// this.OBJECT_NAME="";
// this.LEVELTYPE="";
// this.ATTR_TYPE="";
// this.VALUE="";
// this.SQL="";