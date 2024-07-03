import React, { ReactElement, useRef, useState } from "react";
import { List, ListItem } from "./style";

interface DraggableListProps {
  items: ReactElement[];
}

export const DraggableList: React.FC<DraggableListProps> = ({
  items: initialItems,
}) => {
  const [items, setItems] = useState<ReactElement[]>(initialItems);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const draggedItemIndex = useRef<number | null>(null);

  const onDragStart =
    (index: number) => (event: React.DragEvent<HTMLLIElement>) => {
      draggedItemIndex.current = index;
      event.dataTransfer.effectAllowed = "move";
    };

  const onDragOver =
    (index: number) => (event: React.DragEvent<HTMLLIElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      setDragOverIndex(index);
    };

  const onDragLeave = () => {
    setDragOverIndex(null);
  };

  const onDrop = (index: number) => (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    if (draggedItemIndex.current === null) return;
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedItemIndex.current, 1);
    newItems.splice(index, 0, draggedItem);
    setItems(newItems);
    draggedItemIndex.current = null;
    setDragOverIndex(null);
  };

  return (
    <List>
      {items.map((item, index) => (
        <ListItem
          key={index}
          draggable
          isDraggedOver={index === dragOverIndex}
          onDragStart={onDragStart(index)}
          onDragOver={onDragOver(index)}
          onDragLeave={onDragLeave}
          onDrop={onDrop(index)}
        >
          {item}
        </ListItem>
      ))}
    </List>
  );
};
