export default {
    path: "/item",
    component: () => import("@/views/item"),
    children:[
        {
            path: ':id/detail/',
            component: () => import("@/views/item/detail")
        },

    ]
}