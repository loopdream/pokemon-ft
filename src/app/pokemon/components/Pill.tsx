import classNames from 'classnames';

export default function Pill({
  name,
  color = 'green',
}: {
  name: string;
  color?: string;
}) {
  return (
    <span
      key={name}
      className={classNames(
        'inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border',
        {
          [`bg-green-100 text-green-800 border-green-400`]: color === 'green',
          [`bg-yellow-100 text-yellow-800 border-yellow-400`]:
            color === 'yellow',
          [`bg-orange-100 text-orange-800 border-orange-400`]:
            color === 'orange',
        }
      )}
    >
      {name}
    </span>
  );
}
