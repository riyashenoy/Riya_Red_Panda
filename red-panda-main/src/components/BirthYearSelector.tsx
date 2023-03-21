import { Select } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

export const BirthYearSelector = ({
  setBirthYear
}: {
  setBirthYear: (birthYear: string) => void
}) => ( 
  <>
    <Select 
      icon={<TriangleDownIcon />} 
      variant='filled' 
      height='58px' 
      width='275px' 
      placeholder='birth year' 
      rounded='20px'
      onChange={(e) => setBirthYear(e.target.value)}
    >
      {
        (new Array(30)).fill(0).map((v, i) => i + 1995).map(v => <option value={v.toString()}>{v}</option>)
      }
    </Select>
  </>
)
