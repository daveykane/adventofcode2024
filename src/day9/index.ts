class Disk {
  disk: { id: number; limit: number; offset: number }[] = [];
  diskMap: number[];
  input: number[];
  offset = 0;
  pointer = 0;
  wholeFiles: boolean;

  constructor(input: number[], wholeFiles = false) {
    this.input = input;
    this.diskMap = this.input.slice();
    this.pointer = this.diskMap.length - 1;
    this.wholeFiles = wholeFiles;
  }

  allocate(i: number) {
    // Block has already been allocated to increase offset and skip
    if (this.diskMap[i] === 0) {
      this.offset += this.input[i];
      return;
    }

    // If the block is a file add to disk and increase offset
    if (this.isFile(i) && this.diskMap[i] > 0) {
      this.disk.push({ id: this.getId(i), limit: this.diskMap[i], offset: this.offset });
      this.offset += this.diskMap[i];
    } else {
      let freeSpace = this.diskMap[i];

      // If we're only moving whole files we need to reset the point to recheck from the end if the new space is big enough
      if (this.wholeFiles) {
        this.pointer = this.diskMap.length - 1;
      }

      // While there is space in the block try to allocate as much as possible
      while (freeSpace > 0 && this.pointer > i) {
        if (this.isFile(this.pointer)) {
          let allocate = 0;

          if (this.wholeFiles) {
            // If the block is bigger than the free space or already allocated skip
            if (this.diskMap[this.pointer] > freeSpace || this.diskMap[this.pointer] === 0) {
              this.pointer--;
              continue;
            }

            allocate = this.diskMap[this.pointer];
          } else {
            // If the block is smaller than the free space allocate the whole block
            allocate = Math.min(freeSpace, this.diskMap[this.pointer]);
          }

          // Add the block to the disk and decrease the free space and increase the offset
          this.disk.push({ id: this.getId(this.pointer), limit: allocate, offset: this.offset });
          this.diskMap[this.pointer] -= allocate;
          this.offset += allocate;
          freeSpace -= allocate;

          // If the block is empty decrease the pointer
          if (!this.wholeFiles && this.diskMap[this.pointer] === 0) {
            this.pointer--;
          }
        } else {
          this.pointer--;
        }
      }

      // If we're only moving whole files we need to increase the offset by the remaining free space
      if (this.wholeFiles) {
        this.offset += freeSpace;
      }
    }
  }

  compress() {
    for (let i = 0; i < this.diskMap.length; i++) this.allocate(i);
    return this;
  }

  getCheckSum() {
    return this.disk.reduce((checksum, { id, limit, offset }) => {
      for (let i = 0; i < limit; i++) checksum += (offset + i) * id;
      return checksum;
    }, 0);
  }

  getId(index: number) {
    return index / 2;
  }

  isFile(index: number) {
    return index % 2 === 0;
  }
}

export const part1 = (input: number[]) => new Disk(input).compress().getCheckSum();
export const part2 = (input: number[]) => new Disk(input, true).compress().getCheckSum();
