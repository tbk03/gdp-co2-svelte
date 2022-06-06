export default function expandScale (domainMin, 
    expansionMin = 0, expansionMax = 0){ 

    let domainDist = domainMin[1] - domainMin[0];
    let expandMin = expansionMin * domainDist;
    let expandMax = expansionMax * domainDist;
    let domainExpanded =  [domainMin[0] - expandMin, domainMin[1] + expandMax];
    return domainExpanded;
}