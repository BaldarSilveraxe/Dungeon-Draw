var DungeonDrawTiles = (function () {
    'use strict';
    var textures = [];

    textures['Old School|#18769c'] = [
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399376/g--hDoP9J6RvM1VZLkcRHQ/thumb.jpg?1427051984', key: 'DD_001', value: 124, mask: 125 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399375/s4HjssZ84GaM_scghNggWQ/thumb.jpg?1427051984', key: 'DD_002', value: 28,  mask:  93 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399377/KsvmKT4TMlEN--jpUe18-A/thumb.jpg?1427051984', key: 'DD_003', value: 4,   mask: 85  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399379/Zl0ExZghgMciH6-Lpy5UOw/thumb.jpg?1427051985', key: 'DD_004', value: 0,   mask: 85  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399374/ycwEE1G3UilAD3C3AtyeBw/thumb.jpg?1427051984', key: 'DD_005', value: 68,  mask: 85  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399372/RInz-X6ME-GUXq7iq6LXFg/thumb.jpg?1427051983', key: 'DD_006', value: 255, mask: 255 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399385/5hV7bJ6KsKBODPPn5lX5EA/thumb.jpg?1427051986', key: 'DD_007', value: 29,  mask: 95  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8773588/3amTSVlnHFe_1YS0l7ktUw/thumb.jpg?1428767367', key: 'DD_008', value: 92,  mask: 125 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8773602/7dFVPKzXrPatkjA7OkzGfQ/thumb.jpg?1428767388', key: 'DD_009', value: 84,  mask: 125 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399386/GovutKeRjHd_aqCAS0WXUA/thumb.jpg?1427051986', key: 'DD_010', value: 5,   mask: 87  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399381/YhIEVsSuQ8KwjZGNCC9ddA/thumb.jpg?1427051985', key: 'DD_011', value: 253, mask: 255 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399387/49FCCqFMj93b4YYctgJpNA/thumb.jpg?1427051986', key: 'DD_012', value: 125, mask: 255 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399388/x0Fk0TlbuMnuy5Ub6zsssw/thumb.jpg?1427051986', key: 'DD_013', value: 221, mask: 255 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399389/RgygIO56YHrTfpcv6uveHQ/thumb.jpg?1427051986', key: 'DD_014', value:  93, mask: 255 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399391/07thxn5-1JsnF8huAEVxKw/thumb.jpg?1427051987', key: 'DD_015', value: 85,  mask: 255 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399373/xVvUmlPrlY3Ln4Vll75kHA/thumb.jpg?1427051984', key: 'DD_016', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8362443/Yr0bSSdQW15WKNF1wMVwIw/thumb.png?1426901895', key: 'DD_017', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8362444/w3BmPgGlcsB1aMe0EqbZPw/thumb.png?1426901895', key: 'DD_018', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8362442/eAZoEiOMnvJ6UrwD6_TznQ/thumb.png?1426901895', key: 'DD_019', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8362439/7X3pb0I18lO_u2wwWUrzog/thumb.png?1426901894', key: 'DD_020', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8361290/poZyYdre0iC8YaBGvOfRmw/thumb.png?1426898734', key: 'DD_021', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8361291/Ztj6gMPCAo7JHlOF1cTJzQ/thumb.png?1426898734', key: 'DD_022', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8361288/OcHzOh5PoOG_iG6d5XYWyA/thumb.png?1426898733', key: 'DD_023', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8361292/_PFpz0mdJab3EEjK3qENyw/thumb.png?1426898734', key: 'DD_024', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399392/ySLeCJCh-giFtHrx1mdRYw/thumb.jpg?1427051987', key: 'DD_025', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399413/NWrMq2egxkqF4P08x6CYRQ/thumb.jpg?1427051990', key: 'DD_026', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8362440/U_XEQk5bPy8Ub2_1Nc-5lA/thumb.png?1426901894', key: 'DD_027', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8362435/ssksMoaDtH6Sd14cyxgf6A/thumb.png?1426901893', key: 'DD_028', value: 255,  mask: 0  }
    ];
    
    textures['Basic Dungeon|#000000'] = [
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399399/XuYht7vLxy2HLCqbrwlkNQ/thumb.jpg?1427051988', key: 'DD_001', value: 124, mask: 125 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399397/Ju6c6xiQ9EGaU4-YJt3Vxg/thumb.jpg?1427051988', key: 'DD_002', value: 28,  mask:  93 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399406/g0Lvbwhlrcm0esTX288yNg/thumb.jpg?1427051989', key: 'DD_003', value: 4,   mask: 85  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399400/W5DZXz0BDTz6t9c4R84C2A/thumb.jpg?1427051988', key: 'DD_004', value: 0,   mask: 85  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399401/5M20xyA9eOU1vcn-ndlnYw/thumb.jpg?1427051988', key: 'DD_005', value: 68,  mask: 85  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399394/3ia5PeuD1RpzvRb-Yw01Qg/thumb.jpg?1427051987', key: 'DD_006', value: 255, mask: 255 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399403/oI344B401SievLfwuhDLiA/thumb.jpg?1427051989', key: 'DD_007', value: 29,  mask: 95  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8773584/3_cbHN2VppPWM8VcATOlqw/thumb.jpg?1428767358', key: 'DD_008', value: 92,  mask: 125 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8773598/kqULBC_nkMNf6OGa4591XQ/thumb.jpg?1428767382', key: 'DD_009', value: 84,  mask: 125 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399407/09Up1sZ8m2CJKzHY1taI3w/thumb.jpg?1427051989', key: 'DD_010', value: 5,   mask: 87  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399398/lWS8UsrWVA6vO8nAnVXSZw/thumb.jpg?1427051988', key: 'DD_011', value: 253, mask: 255 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399409/YNWTsVVdoU5w9Juxzk03eQ/thumb.jpg?1427051989', key: 'DD_012', value: 125, mask: 255 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399404/aaCJjiz0VOu24Lh10obPDQ/thumb.jpg?1427051989', key: 'DD_013', value: 221, mask: 255 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399405/9GyFOeyChY3zAvy5oxUn2g/thumb.jpg?1427051989', key: 'DD_014', value:  93, mask: 255 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399410/-EC1guaehIOuHqEmGy6bTQ/thumb.jpg?1427051989', key: 'DD_015', value: 85,  mask: 255 },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399395/hq6ryhmr3eVSboQry-VA8g/thumb.jpg?1427051987', key: 'DD_016', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8362441/k4tso7hmsuySFkIX38YYKA/thumb.png?1426901894', key: 'DD_017', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8362432/WTMM6jX0NTvGcIuaZVb_dg/thumb.png?1426901892', key: 'DD_018', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8362436/IrfRksDiJxWZEA1zgriAVw/thumb.png?1426901893', key: 'DD_019', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8362432/WTMM6jX0NTvGcIuaZVb_dg/thumb.png?1426901892', key: 'DD_020', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8361293/rHdIGwU_lYZ2f3uEKswBIw/thumb.png?1426898735', key: 'DD_021', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8361294/D_U0V8YOnFXoud0OAbYyiQ/thumb.png?1426898735', key: 'DD_022', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8361629/dQ4bqXU8i_drCsqS3cQMsQ/thumb.png?1426899639', key: 'DD_023', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8361683/tsrstbhhP5Tz5rkv7eDfMg/thumb.png?1426899769', key: 'DD_024', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399426/hXMq9r0T-Xix9as3SQ3uLg/thumb.jpg?1427051992', key: 'DD_025', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8399434/927Z3tdunmoUTBeR7Es3Ag/thumb.jpg?1427051993', key: 'DD_026', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8362433/kMaAYdxWK3El2Z9Kcss9pg/thumb.png?1426901892', key: 'DD_027', value: 255,  mask: 0  },
        {url: 'https://s3.amazonaws.com/files.d20.io/images/8362434/zVnBI58-G3kQ7_h_6TuXEA/thumb.png?1426901892', key: 'DD_028', value: 255,  mask: 0  }
    ];

    return textures;
}());
