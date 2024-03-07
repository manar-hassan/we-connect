import { Avatar, AvatarProps } from 'rizzui';
import OwnerIcon from '@public/owner-icon.webp';
import Image from 'next/image';

export default function AvatarCus({
  imageSrc,
  name,
  size,
  isAdmin,
  customSize,
}: {
  imageSrc: string;
  name: string;
  size?: AvatarProps['size'];
  isAdmin?: boolean;
  customSize?: string;
}) {
  return (
    <div className="relative">
      <Avatar
        src={imageSrc}
        color="info"
        size={size ? size : 'DEFAULT'}
        name={name}
        customSize={customSize}
      />
      {isAdmin && (
        <div className="absolute -bottom-1 -right-2 h-5 w-5">
          <Image src={OwnerIcon} alt="Owner Icon" />
        </div>
      )}
    </div>
  );
}
