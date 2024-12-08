class AntennaMap {
  antennas: Map<string, [number, number][]> = new Map();
  antinodes: Set<string> = new Set();
  dimensions: [number, number];

  constructor(map: string[]) {
    this.dimensions = [map[0].length, map.length];
    map.forEach((row, y) => {
      row.split("").forEach((antenna, x) => {
        if (antenna === ".") return;
        this.antennas.set(antenna, (this.antennas.get(antenna) ?? []).concat([[x, y]]));
      });
    });
  }

  isInMap = (x: number, y: number) => x >= 0 && x < this.dimensions[0] && y >= 0 && y < this.dimensions[1];

  placeAntinodes(withResonance = false) {
    for (const antenna of this.antennas.keys()) {
      const locations = this.antennas.get(antenna) ?? [];

      for (let i = 0; i < locations.length; i++) {
        for (let j = 0; j < locations.length; j++) {
          const [x, y, xx, yy] = [...locations[i], ...locations[j]];

          if (x == xx && y == yy) {
            if (withResonance) this.antinodes.add(`${x},${y}`);
            continue;
          }

          const [distanceX, distanceY] = [x - xx, y - yy];
          let [antinodeX, antinodeY] = [x + distanceX, y + distanceY];

          while (this.isInMap(antinodeX, antinodeY)) {
            this.antinodes.add(`${antinodeX},${antinodeY}`);
            antinodeX = withResonance ? antinodeX + distanceX : -1;
            antinodeY = withResonance ? antinodeY + distanceY : -1;
          }
        }
      }
    }

    return this.antinodes.size;
  }
}

export const part1 = (map: string[]) => new AntennaMap(map).placeAntinodes();
export const part2 = (map: string[]) => new AntennaMap(map).placeAntinodes(true);
