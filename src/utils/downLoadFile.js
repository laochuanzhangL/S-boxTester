import * as XLSX from 'xlsx'
//导出按钮
export const btnClickExport = (Csv) => {
    const workbook2blob = (workbook) => {
        const wopts = {
            bookType: "xlsx",
            bookSST: false,
            type: "binary"
        };
        const wbout = XLSX.write(workbook, wopts);
        // 将字符串转ArrayBuffer
        const s2ab = (s) => {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
            return buf;
        }
        const blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        });
        return blob;
    }
    const dataKey = Object.keys(Csv);
    const wb = XLSX.utils.book_new();
    dataKey.forEach(item => {
        if (item === 'nonlinearity') {
            // 当数组是一维的时候
            const temp = [[...Csv[item]]]
            const sheet = XLSX.utils.json_to_sheet(temp)
            XLSX.utils.book_append_sheet(wb, sheet, item);
        } else {
            // 当数组是二维的时候
            const sheet = XLSX.utils.json_to_sheet(Csv[item])
            XLSX.utils.book_append_sheet(wb, sheet, item);
        }
    })
    const workbookBlob = workbook2blob(wb);
    // 生成链接导出文件
    const url = window.URL.createObjectURL(workbookBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'Result.xlsx';
    downloadLink.click();
    window.URL.revokeObjectURL(url);
}
