var DungeonDrawShared = (function () {
    'use strict';
    var DungeonShare = [];
    
DungeonShare['Simple Inn 1'] = '[tag1,tag2,tagn]'
    +'eyJzY2hlbWFWZXJzaW9uIjoxLCJ3aWR0aCI6MjUsImhlaWdodCI6MjcsImJhY2tncm91bm'
    +'RfY29sb3IiOiIjMTMzQjI1IiwiZ3JpZGNvbG9yIjoidHJhbnNwYXJlbnQiLCJzdGFuZGFy'
    +'ZFBhY2tzIjpbIkJhc2ljIER1bmdlb24iLCJSdXN0aWMgTGl2aW5nIiwiU3RvbmUgRmxvb3'
    +'IgRHVuZ2VvbiJdLCJzdGFuZGFyZFRpbGVzIjoiMjFCMEIxIDIxQTBCNSAyMUEwQjYgMjFB'
    +'MEI3IDIxQTBCOCAyMUEwQjkgMjFBMEIxMCAyMUIwQzExIDIyQTBBMSAyMkYwQTIgMjJGME'
    +'EzIDIyRjBBNSAyMkYwQTYgMjJGMEE3IDIyRjBBOCAyMkYwQTkgMjJGMEExMCAyMkEwQzEx'
    +'IDIzQTBBMSAyM0YwQTIgMjNGMEEzIDIzRjBBNSAyM0YwQTYgMjNGMEE3IDIzRjBBOCAyM0'
    +'YwQTkgMjNGMEExMCAyM0EwQzExIDI0QTBBMSAyNEYwQTUgMjRGMEE2IDI0RjBBNyAyNEYw'
    +'QTggMjRGMEE5IDI0RjBBMTAgMjRBMEMxMSAyNUIwQTEgMjVBMEQyIDI1QTBEMyAyNUEwRD'
    +'QgMjVBMEQ1IDI1QTBENiAyNUEwRDcgMjVBMEQ4IDI1QTBEOSAyNUEwRDEwIDI1QjBEMTEg'
    +'MjFFMEIzIDIxRTBCMiAyM0EwQTQgMjJBMEE0IDI0QTBCMyAyNEEwQjIgMjFHMEI0IDI0Sz'
    +'BCNCAxQjFCMSAxQTFCMiAxQjFDMyAyQTFBMSAyRjFBMiAyQTFDMyAzQjFBMSAxQjFCNCAx'
    +'QTFCNSAxQjFDNiAyQTFBNCAyRjFBNSAyQTFDNiAzQjFBNCAxQjFCNyAxQTFCOCAxQjFDOS'
    +'AyQTFBNyAyRjFBOCAyQTFDOSAzQjFBNyA0QjFCMSA0QTFCNCA0QTFCNyA1QjFBMSA1QTFE'
    +'NCA1QTFENyAxQjFCMTAgMkExQTEwIDZCMUIxIDdBMUExIDdGMUEyIDdBMUMzIDhCMUExID'
    +'hBMUQyIDhCMUQzIDZCMUI3IDdBMUE3IDdGMUE4IDdBMUM5IDhCMUE3IDhBMUQ4IDhCMUQ5'
    +'IDZCMUI0IDdBMUE0IDdGMUE1IDdBMUM2IDhCMUE0IDhBMUQ1IDhCMUQ2IDdBMUExMCA3QT'
    +'FDMTEgOEIxQTEwIDhCMUQxMSAzQTFBMTAgM0ExQzExIDRBMUMxMSA0SzFCMTAgNUsxQTEw'
    +'IDVBMUMxMSA2QTFDMTEgNkExQTEwIDVBMUQ5IDVBMUQ2IDVBMUQzIDZCMUM5IDZCMUM2ID'
    +'ZCMUMzIDVMMUQ4IDZMMUI4IDZMMUI1IDZMMUIyIDVMMUQ1IDVMMUQyIDExQTFCMTUgMTJG'
    +'MUExNSAxM0YxQTE1IDE0RjFBMTUgMTVGMUExNSAxNkYxQTE1IDE3RjFBMTUgMThBMUQxNS'
    +'AxMUExQjE2IDExQTFCMTcgMTFBMUIxOCAxMUExQjE5IDExQjFDMjAgMTJGMUExNiAxMkYx'
    +'QTE3IDEyRjFBMTggMTJGMUExOSAxMkExQzIwIDEzRjFBMTYgMTNGMUExNyAxM0YxQTE4ID'
    +'EzRjFBMTkgMTNBMUMyMCAxNEYxQTE2IDE0RjFBMTcgMTRGMUExOCAxNEYxQTE5IDE1RjFB'
    +'MTYgMTVGMUExNyAxNUYxQTE4IDE1RjFBMTkgMTZGMUExNiAxNkYxQTE3IDE2RjFBMTggMT'
    +'ZGMUExOSAxNkExQzIwIDE3RjFBMTYgMTdGMUExNyAxN0YxQTE4IDE3RjFBMTkgMTdBMUMy'
    +'MCAxOEExRDE2IDE4QTFEMTcgMThBMUQxOCAxOEExRDE5IDE4QjFEMjAgMTFBMUIyIDExQT'
    +'FCMyAxMUExQjQgMTFBMUI1IDExQTFCOCAxMUExQjkgMTFBMUIxMCAxMUExQjEyIDExQjFD'
    +'MTMgMTJGMUEzIDEyRjFBNSAxMkYxQTggMTJGMUE5IDEyRjFBMTAgMTJGMUExMiAxMkExQz'
    +'EzIDEzRjFBNSAxM0YxQTggMTNGMUE5IDEzRjFBMTAgMTRBMUExIDE0RjFBMiAxNEYxQTMg'
    +'MTRGMUE0IDE0RjFBOCAxNEYxQTkgMTVBMUExIDE1RjFBMiAxNUYxQTMgMTVGMUE0IDE1Rj'
    +'FBOCAxNUYxQTkgMTZBMUExIDE2RjFBMiAxNkYxQTMgMTZGMUE0IDE2RjFBOCAxNkYxQTkg'
    +'MTdBMUExIDE3RjFBMiAxN0YxQTMgMTdGMUE0IDE3RjFBNSAxN0YxQTggMTdGMUE5IDE4Qj'
    +'FBMSAxOEExRDQgMThBMUQ1IDE4QTFEOCAxOEExRDkgMThBMUQxMCAxOEExRDExIDE4QTFE'
    +'MTIgMTNLMUIxNCAxOEExRDE0IDE4QTFEMTMgMTdGMUExNCAxN0YxQTEzIDExQjFDMTEgMT'
    +'JBMUMxMSAxM0ExQjEyIDEzQTFCMTMgMTNLMUMxMSAxMksxQTE0IDExQTFCMTQgMTVLMUQy'
    +'MCAxNEsxQzIwIDFBMUIxMSAySzFEMTEgMTRGMUE1IDE1RjFBNSAxNkYxQTUgMTRLMUQxMC'
    +'AxNEExRDExIDE0SzFBMTIgMTRGMUExMyAxNEYxQTE0IDE1RjFBMTQgMTZGMUExNCAxNkYx'
    +'QTEzIDE1RjFBMTMgMTFCMUM2IDE4QjFENiAxOEIxQTcgMTFCMUI3IDEzQTFBNyAxNEExQT'
    +'cgMTVBMUE3IDE2QTFBNyAxM0ExQzYgMTRBMUM2IDE1QTFDNiAxNkExQzYgMTJMMUM2IDE3'
    +'TDFDNiAxMkwxQTcgMTdMMUE3IDE1QTFDMTAgMTVBMUExMiAxNkExQTEyIDE3SzFCMTIgMT'
    +'dBMUIxMSAxN0sxQzEwIDE2QTFDMTAgMTZRMUExMSAxNVExQTExIDNCMUQ5IDNCMUQ2IDNC'
    +'MUQzIDRBMUI5IDRBMUI2IDRBMUIzIDRMMUI4IDNMMUQ4IDRMMUI1IDNMMUQ1IDRMMUIyID'
    +'NMMUQyIDEyRjFBMiAxMUMxQzEgMTJFMUExIDEzQTFCMiAxM0ExQjMgMTJLMUE0IDEzSzFC'
    +'NCAxM0gxQTEgMThLMUEyIDE4SzFEMyAxNEYyQTIxIDE1RjJBMjEgMTlGMkEyIDE5RjJBMy'
    +'IsInNwZWNpYWxQYWNrcyI6WyJSdXN0aWMgTGl2aW5nIiwiU3RhdGVseSBNYW5vciIsIlN0'
    +'b25lIEZsb29yIFNld2VyIl0sInNwZWNpYWxUaWxlcyI6IjEyQjBBRkY2IDEyQjBBRkYxMi'
    +'AxMkIwQUZGMTggMzBEMERGRjQyIDRLMEJGRjI2IDI0TDBERkYyNiAyNEEwREZGMTQgMzZB'
    +'MEJGRjE0IDMwRTBBRkY0IDhCMENGRjE2IDhCMENGRjEwIDhCMENGRjQgMjRLMERGRjYgMj'
    +'ZCMEFGRjQgNDZMMEJGRjYgMjRIMEJGRjM4IDI0SDBCRkYzMCAyNkgwQ0ZGNDAgMzRIMENG'
    +'RjQwIDM2SDBERkYzOCAzNkgwREZGMzAgMjRIMEJGRjIwIDM2SDBERkYyMCAzOEQwQUZGNi'
    +'AzNkgwREZGMTAgMjRIMEJGRjEwIDE2SDBERkYxOCAxNkgwREZGMTIgMTZIMERGRjYgNEgw'
    +'QkZGNiA0SDBCRkYxMiA0SDBCRkYxOCA4STBBRkYyMiAzNkUxREZGMzQgMzRFMUFGRjQgND'
    +'RIMkJGRjE2IDMyRzJBRkYyNiA1MEgyQUZGNCAzMkcyQ0ZGMjAifQ==';

DungeonShare['Old School 1'] = '[tag1,tag2,tagn]'
    +'eyJzY2hlbWFWZXJzaW9uIjoxLCJ3aWR0aCI6ODAsImhlaWdodCI6NTAsImJhY2tncm91bm'
    +'RfY29sb3IiOiIjMTg3NjljIiwiZ3JpZGNvbG9yIjoiI0MwQzBDMCIsInN0YW5kYXJkUGFj'
    +'a3MiOlsiT2xkIFNjaG9vbCJdLCJzdGFuZGFyZFRpbGVzIjoiMjNLMEI0IDIzRjBBNSAyM0'
    +'YwQTYgMjNLMEM3IDI0SzBBNCAyNEYwQTUgMjRGMEE2IDI0SzBENyAyNVAwQTQgMjVLMEE1'
    +'IDI1SzBENiAyNVAwRDcgMjJQMEI0IDIySzBCNSAyMkswQzYgMjJQMEM3IDIxQTBBNSAyMU'
    +'EwQzYgMjZBMEE1IDI2QTBDNiAyM0EwQjggMjRBMEQ4IDIzQTBCOSAyM0EwQjEwIDIzQTBC'
    +'MTEgMjNCMEMxMiAyNEEwRDkgMjRBMEQxMCAyNEswQTExIDI0QTBDMTIgMjVBMEExMSAyNU'
    +'EwQzEyIDI2QTBBMTEgMjZBMEMxMiAyN0EwQTExIDI3QTBDMTIgMTlLMEE1IDE5QTBDNiAy'
    +'MEEwQTUgMjBBMEM2IDI3QTBBNSAyN0EwQzYgMjhBMEE1IDI4QTBDNiAxNUEwQjIgMTVCME'
    +'MzIDE2RjBBMiAxNkEwQzMgMTdGMEEyIDE3QTBDMyAxOEYwQTIgMThLMEMzIDE5QTBEMiAx'
    +'OUEwRDMgMThBMEI0IDE5QTBENCAxNUIwQjEgMTZBMEExIDE3QTBBMSAxOEEwQTEgMTlCME'
    +'ExIDI4SDBCMTQgMjhFMEIxNSAyOEcwQjE2IDI4SDBCMTcgMjhFMEIxOCAyOEcwQjE5IDI4'
    +'SDBCMjAgMjhFMEIyMSAyOEcwQjIyIDMwSzBDMTQgMzBBMEIxNSAzMEswQjE2IDMwSzBDMT'
    +'cgMzBBMEIxOCAzMEswQjE5IDMwSzBDMjAgMzBBMEIyMSAzMEswQjIyIDMxSzBEMTQgMzFB'
    +'MEQxNSAzMUswQTE2IDMxSzBEMTcgMzFBMEQxOCAzMUswQTE5IDMxSzBEMjAgMzFBMEQyMS'
    +'AzMUswQTIyIDMzRzBEMTQgMzNFMEIxNSAzM0gwRDE2IDMzRzBEMTcgMzNFMEIxOCAzM0gw'
    +'RDE5IDMzRzBEMjAgMzNFMEIyMSAzM0gwRDIyIDI5QTBDMTQgMzJBMEMxNCAyOUEwQTE2ID'
    +'I5QTBDMTcgMzJBMEExNiAzMkEwQzE3IDI5QTBBMTkgMjlBMEMyMCAzMkEwQTE5IDMyQTBD'
    +'MjAgMjlBMEEyMiAzMkEwQTIyIDI4QTBCMjYgMjhBMEIyNyAyOEEwQjI4IDI5QTBEMjYgMj'
    +'lBMEQyNyAyOUEwRDI4IDMyQTBCMjYgMzJBMEIyNyAzMkEwQjI4IDMzQTBEMjYgMzNBMEQy'
    +'NyAzM0EwRDI4IDI2UDBCMjkgMjdBMEEyOSAyOEswQjI5IDI5SzBBMjkgMzBBMEEyOSAzMU'
    +'EwQTI5IDMySzBCMjkgMzNLMEEyOSAzNEEwQTI5IDM1UDBBMjkgMjVQMEIzMCAyNkswQjMw'
    +'IDI3RjBBMzAgMjhGMEEzMCAyOUYwQTMwIDMwRjBBMzAgMzFGMEEzMCAzMkYwQTMwIDMzRj'
    +'BBMzAgMzRGMEEzMCAzNUswQTMwIDM2UDBBMzAgMjRQMEIzMSAyNUswQjMxIDI2RjBBMzEg'
    +'MjdGMEEzMSAyOEYwQTMxIDI5RjBBMzEgMzBGMEEzMSAzMUYwQTMxIDMyRjBBMzEgMzNGME'
    +'EzMSAzNEYwQTMxIDM1RjBBMzEgMzZLMEEzMSAzN1AwQTMxIDI0QTBCMzIgMjVLMEQzMiAy'
    +'NkEwQzMyIDI3SzBDMzIgMjhGMEEzMiAyOUYwQTMyIDMwRjBBMzIgMzFGMEEzMiAzMkYwQT'
    +'MyIDMzRjBBMzIgMzRLMEQzMiAzNUEwQzMyIDM2SzBDMzIgMzdBMEQzMiAyNEEwQjMzIDI0'
    +'QTBCMzQgMjVBMEQzMyAyNUEwRDM0IDM2QTBCMzMgMzZBMEIzNCAzN0EwRDMzIDM3QTBEMz'
    +'QgMjdQMEMzMyAyOEswQzMzIDI5RjBBMzMgMzBGMEEzMyAzMUYwQTMzIDMyRjBBMzMgMzNL'
    +'MEQzMyAzNFAwRDMzIDI4UDBDMzQgMjlLMEMzNCAzMEYwQTM0IDMxRjBBMzQgMzJLMEQzNC'
    +'AzM1AwRDM0IDI5UDBDMzUgMzBLMEMzNSAzMUswRDM1IDMyUDBEMzUgMzBQMEMzNiAzMVAw'
    +'RDM2IDE1QTBBNSAxNUEwQzYgMTZBMEE1IDE2QTBDNiAxMUEwQjUgMTJLMEE1IDEzQTBBNS'
    +'AxM0EwQzYgMTRBMEE1IDE0QTBDNiA5QTBBMSA5RjBBMiA5QTBDMyAxMEEwQTEgMTBGMEEy'
    +'IDEwQTBDMyAxMUEwQTEgMTFGMEEyIDExSzBDMyAxMkIwQTEgMTJBMEQyIDEyQTBEMyAxMU'
    +'EwQjQgMTJBMEQ0IDEwUDBCNiA5UDBCNyA4UDBCOCA3UDBCOSA2UDBCMTAgN1AwRDEyIDVQ'
    +'MEIxMSA1QTBCMTIgNUEwQjEzIDVBMEIxNCA2QTBEMTMgOEEwQTE0IDhBMEMxNSA5QTBBMT'
    +'QgOUEwQzE1IDEwSzBCMTQgMTBLMEMxNSAxMFAwQjEzIDEwUDBDMTYgMTFLMEIxMyAxMUYw'
    +'QTE0IDExRjBBMTUgMTFLMEMxNiAxMVAwQjEyIDExUDBDMTcgMTJLMEIxMiAxMkYwQTEzID'
    +'EyRjBBMTQgMTJGMEExNSAxMkYwQTE2IDEySzBDMTcgMTJQMEIxMSAxMlAwQzE4IDEzUDBB'
    +'MTEgMTNLMEExMiAxM0YwQTEzIDEzRjBBMTQgMTNGMEExNSAxM0YwQTE2IDEzSzBEMTcgMT'
    +'NQMEQxOCAxNFAwQTEyIDE0SzBBMTMgMTRGMEExNCAxNEYwQTE1IDE0SzBEMTYgMTRQMEQx'
    +'NyAxNVAwQTEzIDE1SzBBMTQgMTVLMEQxNSAxNVAwRDE2IDE2UDBBMTQgMTZQMEQxNSA1QT'
    +'BCMTcgNUEwQjE4IDVBMEIxOSA1QTBCMjAgNUEwQjIxIDVCMEMyMiA2QTBEMTcgNkEwRDE4'
    +'IDZBMEQxOSA2QTBEMjAgNkswQTIxIDZBMEMyMiA3QTBBMjEgN0EwQzIyIDhBMEEyMSA4QT'
    +'BDMjIgOUEwQTIxIDlBMEMyMiAxMEEwQTIxIDEwQTBDMjIgMTFBMEEyMSAxMUEwQzIyIDEy'
    +'QTBBMjEgMTJLMEMyMiAxM0IwQTIxIDEzQTBEMjIgMTJBMEIyMyAxMkEwQjI0IDEySzBCMj'
    +'UgMTJGMEEyNiAxMkYwQTI3IDEyRjBBMjggMTJGMEEyOSAxM0EwRDIzIDEzQTBEMjQgMTNL'
    +'MEEyNSAxM0YwQTI2IDEzRjBBMjcgMTNGMEEyOCAxM0YwQTI5IDEwQTBBMjUgMTBGMEEyNi'
    +'AxMEYwQTI3IDEwRjBBMjggMTBGMEEyOSAxMEEwQzMwIDExQTBBMjUgMTFGMEEyNiAxMUYw'
    +'QTI3IDExRjBBMjggMTFGMEEyOSAxMUEwQzMwIDEyQTBDMzAgMTNBMEMzMCAxNEEwQTI1ID'
    +'E0RjBBMjYgMTRGMEEyNyAxNEYwQTI4IDE0RjBBMjkgMTRBMEMzMCAxNUEwQTI1IDE1RjBB'
    +'MjYgMTVGMEEyNyAxNUYwQTI4IDE1RjBBMjkgMTVBMEMzMCAxNkIwQTI1IDE2QTBEMjYgMT'
    +'ZLMEEyNyAxNkswRDI4IDE2QTBEMjkgMTZCMEQzMCA5QjBCMjUgOUEwQjI2IDlLMEIyNyA5'
    +'SzBDMjggOUEwQjI5IDlCMEMzMCAxN0EwQTI3IDE3QTBDMjggMThBMEEyNyAxOEEwQzI4ID'
    +'E5QjBCMjUgMTlBMEIyNiAxOUswQjI3IDE5SzBDMjggMTlBMEIyOSAxOUIwQzMwIDIwQTBB'
    +'MjUgMjBGMEEyNiAyMEYwQTI3IDIwRjBBMjggMjBGMEEyOSAyMEEwQzMwIDIxQTBBMjUgMj'
    +'FGMEEyNiAyMUYwQTI3IDIxRjBBMjggMjFGMEEyOSAyMUEwQzMwIDIyQjBBMjUgMjJBMEQy'
    +'NiAyMkEwRDI3IDIyQTBEMjggMjJBMEQyOSAyMkIwRDMwIDdBMEEyNyA3QTBDMjggOEEwQT'
    +'I3IDhBMEMyOCAzQjBCMjUgM0EwQjI2IDNBMEIyNyAzQTBCMjggM0EwQjI5IDNCMEMzMCA0'
    +'QTBBMjUgNEYwQTI2IDRGMEEyNyA0RjBBMjggNEYwQTI5IDRBMEMzMCA1QTBBMjUgNUYwQT'
    +'I2IDVGMEEyNyA1RjBBMjggNUYwQTI5IDVBMEMzMCA2QjBBMjUgNkEwRDI2IDZLMEEyNyA2'
    +'SzBEMjggNkEwRDI5IDZCMEQzMCAxN0EwQTUgMTdBMEM2IDE4QTBDNiAxOEswQjUgNkswQT'
    +'E0IDdBMEMxNSA3QTBBMTQgNUEwQjE1IDVBMEIxNiA2QTBEMTYgNkswRDE1IDhQMEQxMSAx'
    +'MFAwRDkgOVAwRDEwIDExUDBEOCAxMlAwRDcgMTFLMEI2IDEwSzBCNyA5SzBCOCA4SzBCOS'
    +'A3SzBCMTAgNkswQjExIDEySzBENiAxMUswRDcgMTBLMEQ4IDlLMEQ5IDhLMEQxMCA3SzBE'
    +'MTEgNkswRDEyIDI4QTBBMTEgMjhLMEMxMiAyOEEwQjEzIDI5RjBBMTMgMzBGMEExMyAyOU'
    +'EwQTExIDMwRjBBMTIgMzBBMEExMSAzMUYwQTEzIDMxQTBBMTEgMzFGMEExMiAzMkEwQTEx'
    +'IDMzQjBBMTEgMzJGMEExMyAzM0EwRDEzIDMzQTBEMTIgMjlGMEExMiAzMkYwQTEyIDMwQT'
    +'BDMjUgMjhBMEIyNSAyOUswRDI1IDMzQTBEMjUgMzFBMEMyNSAzMkswQzI1IDI4QTBCMjMg'
    +'MjhBMEIyNCAyOUYwQTIzIDMwRjBBMjQgMzBGMEEyMyAzM0EwRDI0IDMzQTBEMjMgMzFGME'
    +'EyMyAzMUYwQTI0IDMyRjBBMjMgMjlGMEEyNCAzMkYwQTI0IDIwQTBCMjAgMjBBMEIyMSAy'
    +'MEEwQjIyIDIwQTBCMjMgMjBCMEMyNCAyMUEwRDIwIDIxQTBEMjEgMjFBMEQyMiAyMUEwRD'
    +'IzIDIxQjBEMjQgMThCMEIxNiAxOEEwQjE3IDE4QTBCMTggMThCMEMxOSAxOUEwQTE2IDE5'
    +'RjBBMTcgMTlGMEExOCAxOUEwQzE5IDIwQTBBMTYgMjBGMEExNyAyMEYwQTE4IDIwSzBDMT'
    +'kgMjFBMEExNiAyMUYwQTE3IDIxRjBBMTggMjFLMEQxOSAyMkEwQTE2IDIyRjBBMTcgMjJG'
    +'MEExOCAyMkEwQzE5IDIzQTBBMTYgMjNGMEExNyAyM0YwQTE4IDIzQTBDMTkgMjRCMEExNi'
    +'AyNEEwRDE3IDI0QTBEMTggMjRCMEQxOSAzMUswQjUgMzJLMEE1IDMzQTBBNSAzNEEwQTUg'
    +'MzVBMEE1IDM2QTBBNSAzMUEwQzYgMzJBMEM2IDMzQTBDNiAzNEEwQzYgMzVBMEM2IDM2QT'
    +'BDNiAzMEIwQjEgMzBBMEIyIDMwUDBDMyAzMUEwQTEgMzFGMEEyIDMxSzBDMyAzMkEwQTEg'
    +'MzJGMEEyIDMySzBEMyAzM0EwQTEgMzNGMEEyIDMzQTBDMyAzNEEwQTEgMzRGMEEyIDM0QT'
    +'BDMyAzNUEwQTEgMzVGMEEyIDM1QTBDMyAzNkIwQTEgMzZBMEQyIDM2QjBEMyAzMUEwQjQg'
    +'MzJBMEQ0IDM3SzBDNiAzOEYwQTYgMzlGMEE2IDM3QTBBNSAzOEEwQTUgMzlLMEI1IDM5Qj'
    +'BCMiAzOUEwQjMgMzlBMEI0IDQwQTBBMiA0MEYwQTMgNDBGMEE0IDQwSzBENSA0MUIwQTIg'
    +'NDFBMEQzIDQxQTBENCA0MVAwRDUgMzhLMEM3IDM4QTBCOCAzOEEwQjEwIDM4QTBCMTEgMz'
    +'lGMEE3IDM5RjBBOCAzOUYwQTkgMzlGMEExMCAzOUYwQTExIDM5RjBBMTIgMzdQMEM3IDQw'
    +'TDBEOSA0MEwwRDEyIDQxQzBBMTIgNDBMMEQxNSA0MEgwQzE4IDQxQzBBMTggMzhBMEIxMy'
    +'AzOEEwQjE0IDM4QTBCMTYgMzhBMEIxNyAzOUYwQTEzIDM5RjBBMTQgMzlGMEExNSAzOUYw'
    +'QTE2IDM5RjBBMTcgMzlBMEMxOCA0MEEwRDYgNDBBMEQ3IDQwQTBEOCA0MEEwRDEwIDQwQT'
    +'BEMTEgNDBBMEQxMyA0MEEwRDE0IDQwQTBEMTYgNDBBMEQxNyAyOUEwQTUgMzBBMEE1IDI5'
    +'QTBDNiAzMEEwQzYgNDFDMEExNSA0MUMwQTkgMzhHMEMxOCAzOEwwQjE1IDM4TDBCMTIgMz'
    +'hMMEI5IDM3QzBDMTggMzdDMEMxNSAzN0MwQzEyIDM3QzBDOSAyQjBCMSAyQTBCMiAyQTBC'
    +'MyAyQTBCNCAyQTBCNSAyQTBCNiAyQTBCNyAyQjBDOCAzQTBBMSAzRjBBMiAzRjBBMyAzRj'
    +'BBNCAzRjBBNSAzRjBBNiA0QTBBMSA0RjBBMiA0RjBBMyA0RjBBNCA0RjBBNSA0RjBBNiA1'
    +'QTBBMSA1RjBBMiA1RjBBMyA1RjBBNCA1RjBBNSA1SzBENiA1UDBENyA2QTBBMSA2RjBBMi'
    +'A2RjBBMyA2RjBBNCA2SzBENSA2UDBENiA3UDBENSA3QTBBMSA4QTBBMSA3SzBENCA3RjBB'
    +'MiA3RjBBMyA4SzBEMyA4RjBBMiAzRjBBNyAzQTBDOCA0UDBEOCA0SzBENyA4UDBENCAxOU'
    +'EwQTM5IDE5SzBDNDAgMjBBMEEzOSAyMEswRDQwIDIxQTBBMzkgMjFBMEM0MCAyMkEwQTM5'
    +'IDIyQTBDNDAgMjNBMEEzOSAyM0EwQzQwIDI0QTBDNDAgMjVCMEQ0MCAxOUEwQjQxIDE5QT'
    +'BCNDIgMjBBMEQ0MSAyMEEwRDQyIDE4QTBCNDQgMThBMEI0NSAxOEIwQzQ2IDE5SzBCNDMg'
    +'MTlGMEE0NCAxOUYwQTQ1IDE5QTBDNDYgMjBLMEE0MyAyMEYwQTQ0IDIwRjBBNDUgMjBBME'
    +'M0NiAyMUEwQTQzIDIxRjBBNDQgMjFGMEE0NSAyMUEwQzQ2IDIyQTBBNDMgMjJGMEE0NCAy'
    +'MkYwQTQ1IDIyQTBDNDYgMjNBMEE0MyAyM0YwQTQ0IDIzRjBBNDUgMjNBMEM0NiAyNEIwQT'
    +'QzIDI0QTBENDQgMjRBMEQ0NSAyNEIwRDQ2IDE2QTBBMzkgMTZBMEM0MCAxN0EwQTM5IDE3'
    +'QTBDNDAgMThBMEEzOSAxOEEwQzQwIDE0QTBCNDEgMTRBMEI0MiAxNUEwQTM5IDE1SzBEND'
    +'AgMTVBMEQ0MSAxNUEwRDQyIDEyQTBCNDQgMTJBMEI0NSAxMkIwQzQ2IDE3QTBENDQgMTdB'
    +'MEQ0NSAxN0IwRDQ2IDEyQjBCNDMgMTdCMEE0MyAxOEIwQjQzIDE2QTBBNDMgMTVBMEM0Ni'
    +'AxNkEwQzQ2IDE2RjBBNDUgMTZGMEE0NCAxNUYwQTQ1IDEzQTBBNDMgMTRLMEI0MyAxNUYw'
    +'QTQ0IDE1RjBBNDMgMTNBMEM0NiAxNEEwQzQ2IDEzRjBBNDQgMTNGMEE0NSAxNEYwQTQ1ID'
    +'E0RjBBNDQgMTVLMEE0MyAzM0IwQjM5IDMzQTBCNDAgMzNBMEI0MSAzM0EwQjQyIDMzQTBC'
    +'NDMgMzNBMEI0NCAzM0EwQjQ1IDMzQTBCNDYgMzNCMEM0NyAzNEEwQTM5IDM0RjBBNDAgMz'
    +'RGMEE0MSAzNEYwQTQyIDM0RjBBNDMgMzRGMEE0NCAzNEYwQTQ1IDM0RjBBNDYgMzRBMEM0'
    +'NyAzNUEwQTM5IDM1RjBBNDAgMzVGMEE0MyAzNUYwQTQ2IDM1QTBDNDcgMzZGMEE0MCAzNk'
    +'YwQTQzIDM2RjBBNDYgMzdGMEE0MCAzN0YwQTQxIDM3RjBBNDIgMzdGMEE0MyAzN0YwQTQ0'
    +'IDM3RjBBNDUgMzdGMEE0NiAzOEEwQTM5IDM4RjBBNDAgMzhGMEE0MyAzOEYwQTQ2IDM5QT'
    +'BBMzkgMzlGMEE0MCAzOUYwQTQzIDM5RjBBNDYgMzlBMEM0NyA0MEEwQTM5IDQwRjBBNDAg'
    +'NDBGMEE0MSA0MEYwQTQyIDQwRjBBNDMgNDBGMEE0NCA0MEYwQTQ1IDQwRjBBNDYgNDBBME'
    +'M0NyA0MUIwQTM5IDQxQTBENDAgNDFBMEQ0MSA0MUEwRDQyIDQxQTBENDMgNDFBMEQ0NCA0'
    +'MUEwRDQ1IDQxQTBENDYgNDFCMEQ0NyAyNUEwRDM5IDI0SzBCMzkgMzZLMEIzOSAzN0swQT'
    +'M5IDM1SzBBNDIgMzVLMEE0NSAzOEswQTQ1IDM4SzBBNDIgMzZLMEI0MiAzNkswQjQ1IDM1'
    +'SzBENDQgMzVLMEQ0MSAzOUswQjQ1IDM5SzBCNDIgMzhLMEQ0NCAzOEswRDQxIDM2SzBDND'
    +'EgMzZLMEM0NCAzOUswQzQxIDM5SzBDNDQgMzZBMEI0OSAzNkEwQjUwIDM3RjBBNDkgMzdG'
    +'MEE1MCAzOEEwRDQ5IDM4QTBENTAgMzJBMEE1MSAzMkswRDUyIDMzQTBBNTEgMzNBMEM1Mi'
    +'AzNEEwQTUxIDM0SzBDNTIgMzVBMEE1MSAzNUswRDUyIDM2SzBCNTEgMzZBMEM1MiAzN0Yw'
    +'QTUxIDM3QTBDNTIgMzhLMEE1MSAzOEEwQzUyIDM5QTBBNTEgMzlBMEM1MiA0MEEwQTUxID'
    +'QwQTBDNTIgNDFBMEE1MSA0MUswQzUyIDQyQjBBNTEgNDJBMEQ1MiA0MUEwQjU0IDQxQTBC'
    +'NTUgNDFCMEM1NiA0MkEwRDU0IDQySzBBNTUgNDJBMEM1NiA0MUEwQjUzIDQyQTBENTMgND'
    +'NLMEM1NiA0NEswRDU2IDQ1QTBDNTYgNDZCMEQ1NiA0NkIwQTUxIDQ2QTBENTIgNDZBMEQ1'
    +'MyA0NkEwRDU0IDQ2QTBENTUgNDNBMEE1NSA0NEEwQTU1IDQ1SzBCNTUgNDVBMEI1NCA0NE'
    +'IwQjUxIDQ1QTBBNTEgMzRBMEI1MyAzNEEwQjU0IDM0QTBCNTUgMzRBMEI1NiAzNEEwQjU3'
    +'IDM0QTBCNTggMzRCMEM1OSAzNUEwRDUzIDM1QTBENTQgMzVBMEQ1NSAzNUEwRDU2IDM1QT'
    +'BENTcgMzVLMEE1OCAzNUEwQzU5IDM2QTBDNTkgMzdBMEM1OSAzOEEwQzU5IDM5QjBENTkg'
    +'MzhBMEE1NCAzOEswQzU1IDM4QTBCNTYgMzhBMEI1NyAzOEswQjU4IDM5QjBBNTQgMzlBME'
    +'Q1NSAzOUEwRDU2IDM5QTBENTcgMzlBMEQ1OCAzNkEwQTU4IDM3QTBBNTggMzdCMEI1NCA0'
    +'M0EwQjU3IDQzSzBCNTggNDRBMEQ1NyA0NEEwRDU4IDQyQTBBNTggNDJLMEQ1OSA0M0EwQz'
    +'U5IDQ0QjBENTkgNDFCMEI1OCA0MUEwQjU5IDQxQTBCNjAgNDFBMEI2MSA0MkEwRDYwIDQy'
    +'SzBBNjEgNDJBMEM2MiA0M0EwQzYyIDQ0QTBDNjIgNDVLMEM2MiA0NkEwRDYyIDQzQTBBNj'
    +'EgNDRBMEE2MSA0NUEwQTYxIDQ2QjBBNjEgNDFCMEM2MiAzMUEwQTUxIDMxSzBDNTIgMzFB'
    +'MEI1MyAzMUEwQjU0IDMxQTBCNTUgMzFBMEI1NiAzMUEwQjU3IDMxQTBCNTggMzJBMEQ1My'
    +'AzMkEwRDU0IDMyQTBENTUgMzJBMEQ1NiAzMkEwRDU3IDMyQTBENTggMzFBMEI1OSAzMUEw'
    +'QjYwIDMxQTBCNjEgMzFBMEI2MiAzMkEwRDU5IDMyQTBENjAgMzJBMEQ2MSAzMkEwRDYyID'
    +'MxQTBCNjMgMzFBMEI2NCAzMkEwRDYzIDMySzBBNjQgMzFCMEM2NSAzMkEwQzY1IDMzQTBD'
    +'NjUgMzRBMEM2NSAzNUEwQzY1IDM2QTBDNjUgMzdBMEM2NSAzOEEwQzY1IDM5QTBDNjUgMz'
    +'RBMEE2NCAzNUEwQTY0IDM2QTBBNjQgMzdBMEE2NCAzOEswQjY0IDM5SzBBNjQgMzlCMEE2'
    +'MSAzOUEwRDYyIDM5QTBENjMgMzRCMEI2MSAzNEIwQzYyIDM1QTBBNjEgMzVBMEM2MiAzNk'
    +'EwQTYxIDM2QTBDNjIgMzdBMEE2MSAzN0EwQzYyIDM4QTBBNjEgMzhLMEM2MiAzOEEwQjYz'
    +'IDMzQTBBNjQgNDVBMEI2MyA0NUEwQjY0IDQ1QTBCNjUgNDVBMEI2NiA0NUswQjY3IDQ1QT'
    +'BDNjggNDZBMEQ2MyA0NkEwRDY0IDQ2QTBENjUgNDZBMEQ2NiA0NkEwRDY3IDQ2QjBENjgg'
    +'MjhCMEI2MiAyOEEwQjYzIDI4QTBCNjQgMjhBMEI2NSAyOEEwQjY2IDI4QTBCNjcgMjhCME'
    +'M2OCAyOUIwQTYyIDI5QTBENjMgMjlBMEQ2NCAyOUEwRDY1IDI5QTBENjYgMjlLMEE2NyAy'
    +'OUEwQzY4IDMwQTBBNjcgMzBBMEM2OCAzMUEwQTY3IDMxQTBDNjggMzJBMEE2NyAzMkEwQz'
    +'Y4IDMzQTBBNjcgMzNBMEM2OCAzNEEwQTY3IDM0SzBDNjggMzVBMEE2NyAzNUswRDY4IDM2'
    +'QTBBNjcgMzZBMEM2OCAzN0EwQTY3IDM3QTBDNjggMzhBMEE2NyAzOEEwQzY4IDM5QTBBNj'
    +'cgMzlBMEM2OCA0MEEwQTY3IDQwQTBDNjggNDFBMEE2NyA0MUEwQzY4IDQyQTBBNjcgNDJB'
    +'MEM2OCA0M0EwQTY3IDQzQTBDNjggNDRBMEE2NyA0NEEwQzY4IDQwQTBBNjQgNDFBMEE2NC'
    +'A0MkEwQTY0IDQzQjBBNjQgNDBBMEM2NSA0MUEwQzY1IDQyQTBDNjUgNDNCMEQ2NSAyOEIw'
    +'QjUxIDI4QTBCNTIgMjlBMEE1MSAyOUswRDUyIDMwQTBBNTEgMzBBMEM1MiAyOEEwQjUzID'
    +'I4QTBCNTQgMjhBMEI1NSAyOEEwQjU2IDI4QTBCNTcgMjhBMEI1OCAyOEswQjU5IDI4QTBD'
    +'NjAgMjlBMEQ1MyAyOUEwRDU0IDI5QTBENTUgMjlBMEQ1NiAyOUEwRDU3IDI5QTBENTggMj'
    +'lBMEQ1OSAyOUIwRDYwIDI1QTBBNTEgMjVLMEM1MiAyNUEwQjUzIDI1QTBCNTQgMjVBMEI1'
    +'NSAyNkIwQTUxIDI2QTBENTIgMjZBMEQ1MyAyNkEwRDU0IDI2QTBENTUgMjJCMEI1MSAyMk'
    +'EwQjUyIDIzQTBBNTEgMjNLMEQ1MiAyNEEwQTUxIDI0QTBDNTIgMjJBMEI1MyAyMkEwQjU0'
    +'IDIyQTBCNTUgMjJBMEI1NiAyMkEwQjU3IDIyQTBCNTggMjJBMEI1OSAyMkIwQzYwIDIzQT'
    +'BENTMgMjNBMEQ1NCAyM0EwRDU1IDIzQTBENTYgMjNBMEQ1NyAyM0EwRDU4IDIzSzBBNTkg'
    +'MjNBMEM2MCAyNEEwQTU5IDI0QTBDNjAgMjVBMEE1OSAyNUswQzYwIDI2QTBBNTkgMjZLME'
    +'Q2MCAyN0EwQTU5IDI3QTBDNjAgMjVBMEI1NiAyNUIwQzU3IDI2QTBENTYgMjZCMEQ1NyAy'
    +'MkIwQjYyIDIyQTBCNjMgMjJBMEI2NCAyMkEwQjY1IDIyQTBCNjYgMjJBMEI2NyAyM0IwQT'
    +'YyIDIzQTBENjMgMjNBMEQ2NCAyM0EwRDY1IDIzQTBENjYgMjNLMEE2NyAyMkIwQzY4IDIz'
    +'QTBDNjggMjRBMEM2OCAyNUswQzY4IDI2QTBENjggMjVBMEI2MSAyNUEwQjYyIDI1QTBCNj'
    +'MgMjVBMEI2NCAyNUEwQjY1IDI1QTBCNjYgMjVLMEI2NyAyNkEwRDYxIDI2QTBENjIgMjZB'
    +'MEQ2MyAyNkEwRDY0IDI2QTBENjUgMjZBMEQ2NiAyNkEwRDY3IDI0QTBBNjcgMzRBMEI2OS'
    +'AzNEswQjcwIDM1QTBENjkgMzVLMEE3MCAyOEIwQjcwIDI4QjBDNzEgMjlBMEE3MCAyOUEw'
    +'QzcxIDMwQTBBNzAgMzBBMEM3MSAzMUEwQTcwIDMxQTBDNzEgMzJBMEE3MCAzMkEwQzcxID'
    +'MzQTBBNzAgMzNBMEM3MSAzNEEwQzcxIDM1QTBDNzEgMzZBMEE3MCAzNkEwQzcxIDM3QTBB'
    +'NzAgMzdBMEM3MSAzOEEwQTcwIDM4QTBDNzEgMzlBMEE3MCAzOUswQzcxIDM5QTBCNzIgMz'
    +'lBMEI3MyAzOUEwQjc0IDQwQjBBNzAgNDBBMEQ3MSA0MEEwRDcyIDQwQTBENzMgNDBLMEE3'
    +'NCAzOUIwQzc1IDQwQTBDNzUgNDFBMEE3NCA0MUEwQzc1IDQyQTBBNzQgNDJBMEM3NSA0M0'
    +'EwQTc0IDQzQTBDNzUgNDNGMEE3MSA0NEYwQTcxIDQ1RjBBNzEgNDZBMEQ3MSA0MkIwQjcw'
    +'IDQyQTBCNzEgNDJCMEM3MiA0M0EwQTcwIDQzQTBDNzIgNDRBMEE3MCA0NEEwQzcyIDQ1QT'
    +'BBNzAgNDVLMEM3MiA0NkIwQTcwIDQ2QTBENzIgNDVBMEI3MyA0NUswQjc0IDQ1QTBDNzUg'
    +'NDZBMEQ3MyA0NkEwRDc0IDQ2QjBENzUgNDRBMEE3NCA0NEEwQzc1IDIyQjBCNzAgMjJBME'
    +'I3MSAyMkEwQjcyIDIyQTBCNzMgMjJBMEI3NCAyM0IwQTcwIDIzQTBENzEgMjNBMEQ3MiAy'
    +'M0EwRDczIDIzQTBENzQgMjNLMEE3NSAyM0EwQzc2IDI2QTBENjkgMjZBMEQ3MCAyNkEwRD'
    +'cxIDI2QTBENzIgMjZLMEE3MyAyNkswRDc0IDI2QTBENzUgMjZCMEQ3NiAyNEEwQTc1IDI0'
    +'QTBDNzYgMjVLMEI3NSAyNUEwQzc2IDI1QTBCNjkgMjVBMEI3MCAyNUEwQjcxIDI1QTBCNz'
    +'IgMjVBMEI3MyAyNUEwQjc0IDI3QTBBNzMgMjdBMEM3NCAyOEEwQTczIDI4QTBDNzQgMjlB'
    +'MEE3MyAyOUEwQzc0IDMwQTBBNzMgMzBBMEM3NCAzMUEwQTczIDMxQTBDNzQgMzJBMEE3My'
    +'AzMkEwQzc0IDMzQTBBNzMgMzNBMEM3NCAzNEEwQTczIDM0QTBDNzQgMzVBMEE3MyAzNUEw'
    +'Qzc0IDM2QTBBNzMgMzZLMEM3NCAzN0IwQTczIDM3QTBENzQgMzZBMEI3NSAzNkswQjc2ID'
    +'M2QTBDNzcgMzdBMEQ3NSAzN0EwRDc2IDM3QjBENzcgMjhCMEI3NiAyOEIwQzc3IDI5QTBB'
    +'NzYgMjlBMEM3NyAzMEEwQTc2IDMwQTBDNzcgMzFBMEE3NiAzMUEwQzc3IDMyQTBBNzYgMz'
    +'JBMEM3NyAzM0EwQTc2IDMzQTBDNzcgMzRBMEE3NiAzNEEwQzc3IDM1QTBBNzYgMzVBMEM3'
    +'NyA3QTBBMzkgN0EwQzQwIDhBMEEzOSA4SzBDNDAgOUEwQTM5IDlLMEQ0MCAxMEEwQTM5ID'
    +'EwQTBDNDAgMTFBMEEzOSAxMUEwQzQwIDEyQTBBMzkgMTJBMEM0MCA5QTBENDEgOUEwRDQy'
    +'IDlBMEQ0MyA5QTBENDQgOUEwRDQ1IDlBMEQ0NiA5QTBENDcgOUIwRDQ4IDhBMEI0MSA4QT'
    +'BCNDIgOEEwQjQzIDhBMEI0NCA4QTBCNDUgOEEwQjQ2IDhBMEI0NyA4QjBDNDggM0EwQjQy'
    +'IDNBMEI0MyAzQTBCNDQgM0EwQjQ1IDNBMEI0NiAzQjBDNDcgNEswQTQyIDRGMEE0MyA0Rj'
    +'BBNDQgNEYwQTQ1IDRGMEE0NiA0QTBDNDcgNUEwQTQyIDVGMEE0MyA1RjBBNDQgNUYwQTQ1'
    +'IDVGMEE0NiA1QTBDNDcgNkIwQTQyIDZBMEQ0MyA2QTBENDQgNkEwRDQ1IDZBMEQ0NiA2Qj'
    +'BENDcgNEEwQTM5IDRLMEQ0MCA0QTBENDEgM0IwQjM5IDNBMEI0MCAzQTBCNDEgNUEwQTM5'
    +'IDZBMEEzOSA1QTBDNDAgNkEwQzQwIDE4SzBBNzUgMThBMEM3NiAxOUEwQTc1IDE5QTBDNz'
    +'YgMjBBMEE3NSAyMEEwQzc2IDE3QTBCNzQgMTdBMEI3NSAxN0IwQzc2IDE4QTBENzQgMTFB'
    +'MEI2OCAxMkEwQTY3IDlBMEE1MyA5QTBDNTQgMTBBMEE1MyAxMEEwQzU0IDExQTBBNTMgMT'
    +'FBMEM1NCAxMkEwQTUzIDEyQTBDNTQgMTNBMEE1MyAxM0EwQzU0IDE0QTBBNTMgMTRBMEM1'
    +'NCAxNUEwQTUzIDE4QjBBNjcgOEIwQjUzIDhCMEM1NCAyMkEwQzc2IDIxQTBDNzYgMjJLME'
    +'I3NSAyMUEwQTc1IDE3QTBCNzMgMTFBMEI3MyAxMkEwRDczIDE3QTBBNjcgMThBMEQ2OCAx'
    +'OEEwRDczIDE3SzBDNjggMTFCMEI2NyAxMkswRDY4IDlBMEE3NCA5QTBDNzUgMTBBMEE3NC'
    +'AxMEEwQzc1IDExQTBBNzQgMTFBMEM3NSAxMkIwQTc0IDEyQjBENzUgN0EwQjcwIDdBMEI3'
    +'MSA3QTBCNzIgN0EwQjczIDdBMEI3NCA3QjBDNzUgOEEwRDcwIDhBMEQ3MSA4QTBENzIgOE'
    +'EwRDczIDhLMEE3NCA4QTBDNzUgNUswQTY4IDVLMEQ2OSA2QTBBNjggNkEwQzY5IDdLMEI2'
    +'OCA3SzBDNjkgOEEwRDY4IDhBMEQ2OSA3QTBCNjQgN0EwQjY1IDdBMEI2NiA3QTBCNjcgOE'
    +'swRDY0IDhBMEQ2NSA4QTBENjYgOEEwRDY3IDdCMEI2MyA4QTBBNjMgOUEwQTYzIDlBMEM2'
    +'NCAyQjBCNjUgMkEwQjY2IDJBMEI2NyAyQTBCNjggMkEwQjY5IDJBMEI3MCAyQjBDNzEgM0'
    +'EwQTY1IDNGMEE2NiAzRjBBNjcgM0YwQTY4IDNGMEE2OSAzRjBBNzAgM0EwQzcxIDRBMEE2'
    +'NSA0RjBBNjYgNEYwQTY3IDRGMEE2OCA0RjBBNjkgNEYwQTcwIDRBMEM3MSA1QjBBNjUgNU'
    +'EwRDY2IDVBMEQ2NyA1QTBENzAgNUIwRDcxIDE0UDBCNTkgMTRLMEI2MCAxNUswQjU5IDE1'
    +'SzBENjAgMTZBMEQ1OSAxNlAwRDYwIDEzUDBCNjAgMTNLMEI2MSAxM0YwQTYyIDE1UDBENj'
    +'EgMTJQMEI2MSAxMkEwQjYyIDEySzBCNjMgMTJBMEM2NCAxM0YwQTYzIDEzQTBDNjQgMTRB'
    +'MEQ2MyAxNEIwRDY0IDEwQTBBNjMgMTBBMEM2NCAxMUEwQTYzIDExQTBDNjQgMTVLMEM1NC'
    +'AxNkIwQTUzIDE2QTBENTQgMTRBMEQ2MiAxNEswRDYxIDlBMEE1NiA5RjBBNTcgMTBBMEE1'
    +'NiAxMEswRDU3IDExQTBBNTYgMTFBMEM1NyAxMkEwQTU2IDEyQTBDNTcgN0IwQjU2IDdBME'
    +'I1NyA3SzBCNTggN0swQzU5IDdBMEI2MCA3QjBDNjEgOEEwQTU2IDhGMEE1NyA4RjBBNTgg'
    +'OEYwQTU5IDhGMEE2MCA4QTBDNjEgOUYwQTU4IDlGMEE1OSA5RjBBNjAgOUEwQzYxIDEwQT'
    +'BENTggMTBBMEQ1OSAxMEEwRDYwIDEwQjBENjEgNUswQTU4IDVBMEM1OSA2QTBBNTggNkEw'
    +'QzU5IDNCMEI0OCAzQTBCNDkgM0EwQjUwIDNBMEI1MSAzQTBCNTIgM1AwQzUzIDRBMEE0OC'
    +'A0RjBBNDkgNEYwQTUwIDRGMEE1MSA0RjBBNTIgNEswQzUzIDVBMEE0OCA1RjBBNDkgNUYw'
    +'QTUwIDVGMEE1MSA1RjBBNTIgNUswRDUzIDZCMEE0OCA2QTBENDkgNkEwRDUwIDZBMEQ1MS'
    +'A2QTBENTIgNlAwRDUzIDVBMEQ1NCA1QTBENTUgNUEwRDU2IDVBMEQ1NyA0QTBCNTQgNEEw'
    +'QjU1IDRBMEI1NiA0QTBCNTcgM1AwQjU4IDNBMEI1OSA0SzBCNTggNEswRDU5IDNBMEI2MC'
    +'AzSzBCNjEgM0YwQTYyIDNBMEM2MyA0QTBENjAgNEswQTYxIDRGMEE2MiA0QTBDNjMgMlAw'
    +'QjYxIDJBMEI2MiAyQjBDNjMgNVAwQTYxIDVBMEQ2MiA1QjBENjMgMThCMEI1NCAxOEEwQj'
    +'U1IDE4QTBCNTggMThBMEI1OSAxOEEwQjYwIDE4QjBDNjEgMTlBMEE1NCAxOUYwQTU1IDE5'
    +'RjBBNTYgMTlGMEE1NyAxOUYwQTU4IDE5RjBBNTkgMTlGMEE2MCAxOUEwQzYxIDIwQjBBNT'
    +'QgMjBBMEQ1NSAyMEEwRDU2IDIwQTBENTcgMjBBMEQ1OCAyMEEwRDU5IDIwQTBENjAgMjBC'
    +'MEQ2MSAxM0EwQTU2IDEzQTBDNTcgMTRBMEM1NyAxNEEwQTU2IDE3QTBBNTYgMTdBMEM1Ny'
    +'AxOEswQzU3IDE4SzBCNTYgMTVBMEI1NSAxNUswQjU2IDE2SzBBNTYgMTZBMEQ1NSAxNUsw'
    +'QzU3IDE1QTBCNTggMTZBMEQ1OCAxNkswRDU3IDEzQTBBMzkgMTNBMEM0MCAxNEswQzQwID'
    +'E0QTBBMzkgNDRBMEI1MiA0NUswQzUzIDQ1RjBBNTIgNDRCMEM1MyAzN0IwQzU1IDM4QTBE'
    +'NDggMzhLMEQ0NyAzNkswQzQ3IDM2QTBCNDggMzdGMEE0OCAzN0YwQTQ3Iiwic3BlY2lhbF'
    +'BhY2tzIjpbIk9sZCBTY2hvb2wiXSwic3BlY2lhbFRpbGVzIjoiNDhMMERGRjYgNzRLMERG'
    +'Rjc2IDUwSzBCRkY3MiA1MEwwREZGNzYgNzRMMEJGRjcyIDM4QjBCRkY4IDI0QjBCRkY4ID'
    +'Q4RDBCRkYxOCA0MkQwQUZGMTIgNTREMENGRjEyIDY0QjBCRkY4IDE0RDBBRkYzMCA3MEow'
    +'QUZGMTIgMzZEMEFGRjU2IDE2RDBDRkY1NiA1OEowQkZGNTQgNjZKMEJGRjU0IDYyRTBBRk'
    +'Y0OCAxOEswQkZGMTAwIDE4TDBERkYxMDQgMzZLMERGRjE0NCAzNkwwQkZGMTQwIDMySzBB'
    +'RkYxMzYgMjhMMENGRjEzNiAyNEswQkZGMTQwIDI0TDBERkYxNDQgNDBCMEJGRjg2IDMwQj'
    +'BCRkY4NiAxMkQwQUZGODAgMTREMEFGRjExOCA4SjBCRkYxMjAgMTRCMEFGRjEzOCA2OEcw'
    +'QkZGODYgODJHMERGRjg2In0=';
    
    return DungeonShare;
}());
