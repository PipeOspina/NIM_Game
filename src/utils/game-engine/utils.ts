export default function normalizeBinaries(binaries: string[]): string[] {
    const index: number = parseInt(binaries.shift() || '');
    const length: number = binaries[index].length;
    const normalizedBinaries: string[] = [];
    binaries.forEach((binary, i) => {
        if (binary.length === length || i === index) {
            normalizedBinaries.push(binary);
        } else {
            const times: number = length - binary.length;
            let normalized: string = '';
            for (let j = 0; j < times; j++) {
                normalized += '0';
            }
            normalized += binary;
            normalizedBinaries.push(normalized)
        }
    });
    return normalizedBinaries;
}

export interface Binaries {
    columnSums: number[],
    binaries: string[],
    isEven: boolean[],
    bigger?: Bigger
    needSolution: boolean;
}

export interface Bigger {
    index: number,
    size: number
}

export function sumBinaryColumns(binaries: string[]): Binaries {
    const binaryOfEnables = normalizeBinaries(binaries);
    const columnSums: number[] = [];
    binaryOfEnables.forEach((binary, i) => {
        if (i === 0) {
            Array.from(binary).forEach((item, j) => {
                columnSums[j] = Number.parseInt(item);
            });
        } else {
            Array.from(binary).forEach((item, j) => {
                columnSums[j] += Number.parseInt(item);
            });
        }
    });
    const isEven: boolean[] = [];
    let needSolution = false;
    columnSums.forEach((sum, i) => {
        isEven[i] = (sum % 2) === 0;
        !isEven[i] ? needSolution = true : 0;
    });

    return {
        columnSums: columnSums,
        binaries: binaryOfEnables,
        isEven: isEven,
        needSolution: needSolution
    };
}
