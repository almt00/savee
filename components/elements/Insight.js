import React from "react";
import Card from "./Card";
import Task from "./Task";
import Tip from "./Tip";

export default function Insight() {
  return (
    <>
      <Card size="sm" type="stroke">
        <div className="flex justify-between gap-2">
          <Task type="Secar cabelo" size="sm" />
          <div className="flex gap-1 items-center">
            <h4>11,3€</h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-danger"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
              />
            </svg>
          </div>
        </div>
        <div className="text-xs">
          Aqueceste o teu compartimento durante 36h este mês. Isto corresponde a
          50% do teu valor a pagar.
        </div>
        <Tip classes="mt-2">
          Fechar as janelas e isolar as portas ajuda a manter a casa
          termicamente mais confortável.
        </Tip>
      </Card>
    </>
  );
}
