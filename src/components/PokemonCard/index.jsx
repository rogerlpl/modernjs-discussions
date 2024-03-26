import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export function PokemonCard({name,url}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" w={330} withBorder>
      <Card.Section>
        <Image
          src={url}
          height={160}
          fit="contain"
          alt="Norway"
        />
      </Card.Section>

      <Group justify="center" mt="md" mb="xs">
        <Text fw={500} ta="center" tt="capitalize">{name}</Text>
      </Group>
    </Card>
  );
}
