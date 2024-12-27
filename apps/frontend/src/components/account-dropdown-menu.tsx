import { DropdownMenu } from './dropdown';
import { SignOutDropdownItem } from './signout-dropdown';

export function AccountDropdownMenu({
  anchor,
}: {
  anchor: 'top start' | 'bottom end';
}) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      {/*<DropdownItem href="/dashboard/settings">*/}
      {/*  <Cog8ToothIcon />*/}
      {/*  <DropdownLabel>Settings</DropdownLabel>*/}
      {/*</DropdownItem>*/}
      {/*<DropdownDivider />*/}
      {/*<DropdownItem href="#">*/}
      {/*  <ShieldCheckIcon />*/}
      {/*  <DropdownLabel>Privacy policy</DropdownLabel>*/}
      {/*</DropdownItem>*/}
      {/*<DropdownItem href="#">*/}
      {/*  <LightBulbIcon />*/}
      {/*  <DropdownLabel>Share feedback</DropdownLabel>*/}
      {/*</DropdownItem>*/}
      {/*<DropdownItem href="#">*/}
      {/*  <QuestionMarkCircleIcon />*/}
      {/*  <DropdownLabel>Support</DropdownLabel>*/}
      {/*</DropdownItem>*/}
      {/*<DropdownDivider />*/}
      <SignOutDropdownItem />
    </DropdownMenu>
  );
}
