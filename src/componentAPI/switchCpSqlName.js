
// 透過host取得cpSql四格內容
export function switchCpSqlName(host){
     switch(host){
         case '192.168.100.199':
         return '199_utility.Pedia'
         case '192.168.100.134':
         return '134_utility.Pedia'
         case '192.168.110.85':
         return '085_utility.Pedia'
         case '192.168.100.65':
         return '065_utility.Pedia'
         case '192.168.122.167':
         return '167_utility.Pedia'
     }
}