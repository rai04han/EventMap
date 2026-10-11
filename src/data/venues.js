/**
 * venues.js – campus venue data
 *
 * Owner: C
 * Each venue: { id, name, building, floor, landmark, directions, mapX, mapY, route }
 * mapX/mapY are percentages (0-100) for pin placement on the SVG campus map.
 * route: array of [x, y] SVG coordinates (viewBox 0-800 x 0-500) tracing the
 *        walking path from Main Gate to the venue. Used by CampusMap for route overlay.
 */

export const venues = [
  {
    id: 'v1',
    name: 'Main Auditorium',
    building: 'Admin Block',
    floor: 'Ground Floor',
    landmark: 'Next to the reception desk',
    directions:
      'From the main gate, walk straight along the central pathway for 2 minutes. The Admin Block is the large building directly ahead. Enter through the main doors — the auditorium is on the ground floor to your left.',
    mapX: 50,
    mapY: 35,
    // Main Gate → straight up the central pathway → Admin Block
    route: [
      [400, 456],
      [400, 200],
      [400, 140],
    ],
  },
  {
    id: 'v2',
    name: 'Seminar Hall A',
    building: 'Academic Block 1',
    floor: '2nd Floor',
    landmark: 'Opposite the library entrance',
    directions:
      'From the main gate, take the left pathway past the canteen. Academic Block 1 is the 3-storey building on your right. Take the stairs to the 2nd floor; Seminar Hall A is the first room on your right.',
    mapX: 30,
    mapY: 50,
    // Main Gate → central path to y=270 → left along road → Academic Block 1
    // (avoids Canteen at 265-350, 355-400 by using the y=270 road instead of y=370)
    route: [
      [400, 456],
      [400, 270],
      [270, 270],
      [212, 240],
    ],
  },
  {
    id: 'v3',
    name: 'Open-Air Stage',
    building: 'Central Quadrangle',
    floor: 'Ground Level',
    landmark: 'Between the canteen and the library',
    directions:
      'From the main gate, walk straight for 1 minute and turn left at the signboard. The open-air stage is in the centre of the quadrangle — you\'ll hear the speakers!',
    mapX: 45,
    mapY: 55,
    // Main Gate → central path → slight left to the Open-Air Stage centre
    route: [
      [400, 456],
      [400, 370],
      [400, 270],
      [372, 270],
    ],
  },
  {
    id: 'v4',
    name: 'CS Lab 3',
    building: 'Tech Wing',
    floor: '3rd Floor',
    landmark: 'Near the elevator on the east side',
    directions:
      'From the main gate, turn right toward the Tech Wing (the building with the glass facade). Take the elevator or stairs to the 3rd floor. CS Lab 3 is at the end of the corridor on your left.',
    mapX: 72,
    mapY: 40,
    // Main Gate → central path → right branch to Tech Wing
    route: [
      [400, 456],
      [400, 270],
      [400, 200],
      [520, 200],
      [572, 200],
      [572, 180],
    ],
  },
  {
    id: 'v5',
    name: 'Sports Ground',
    building: 'Outdoor Facilities',
    floor: 'Ground Level',
    landmark: 'Behind the hostel block',
    directions:
      'From the main gate, walk straight past the Admin Block and continue for 3 minutes. The sports ground is behind the hostel block — follow the painted path.',
    mapX: 60,
    mapY: 78,
    // Main Gate → central path → right along y=370 road → Sports Ground centre
    route: [
      [400, 456],
      [400, 370],
      [477, 370],
      [477, 388],
    ],
  },
  {
    id: 'v6',
    name: 'Mini Hall',
    building: 'Student Centre',
    floor: '1st Floor',
    landmark: 'Above the co-op store',
    directions:
      'From the main gate, take the right pathway for 1 minute. The Student Centre is on your left (look for the "Co-op Store" sign). Go up the staircase — Mini Hall is on the 1st floor.',
    mapX: 35,
    mapY: 30,
    // Main Gate → central path to y=200 → left at x=335 (below Admin Block) →
    // up past Admin Block on its left side → across top → down into Student Centre
    // (avoids Admin Block at 350-450, 110-170)
    route: [
      [400, 456],
      [400, 200],
      [335, 200],
      [335, 85],
      [262, 85],
      [262, 122],
    ],
  },
];
