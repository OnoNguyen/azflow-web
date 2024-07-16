import React, { ReactElement, useEffect, useRef, useState } from "react";
import { List, ListItem } from "./style";

export type DraggableListItem = {
  key: string;
  content: ReactElement;
};

type DraggableListProps = {
  initialItems: DraggableListItem[];
  onUpdate: (updatedItems: DraggableListItem[]) => void;
};

export const DraggableList: React.FC<DraggableListProps> = ({
  initialItems,
  onUpdate,
}) => {
  const [items, setItems] = useState<DraggableListItem[]>(initialItems);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const draggedItemIndex = useRef<number | null>(null);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

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
    onUpdate(newItems); // Call the callback with the updated list
    draggedItemIndex.current = null;
    setDragOverIndex(null);
  };

  return items.length === 0 ? (
    <p>No items to show</p>
  ) : (
    <List>
      {items.map((item, index) => (
        <ListItem
          key={item.key}
          draggable
          $isDraggedOver={index === dragOverIndex}
          onDragStart={onDragStart(index)}
          onDragOver={onDragOver(index)}
          onDragLeave={onDragLeave}
          onDrop={onDrop(index)}
        >
          {item.content}
        </ListItem>
      ))}
    </List>
  );
};
